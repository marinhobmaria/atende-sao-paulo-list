import { useState, useRef, useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  code: string;
  description: string;
  shortCode?: string;
}

interface SearchableSelectProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  emptyMessage: string;
  options: Option[];
  required?: boolean;
  multiple?: boolean;
  className?: string;
}

export const SearchableSelect = ({
  form,
  name,
  label,
  placeholder,
  emptyMessage,
  options,
  required = false,
  multiple = false,
  className
}: SearchableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(item => 
    (item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (item.shortCode && item.shortCode.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (!multiple || !selectedOptions.some(selected => selected.code === item.code))
  );

  const handleOptionSelect = (option: Option) => {
    if (multiple) {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
      form.setValue(name, updatedOptions.map(o => `${o.code} - ${o.description}`).join("; "));
    } else {
      form.setValue(name, `${option.code} - ${option.description}`);
      setSearchTerm(`${option.code} - ${option.description}`);
    }
    setShowResults(false);
    if (multiple) {
      setSearchTerm("");
      inputRef.current?.focus();
    }
  };

  const removeOption = (codeToRemove: string) => {
    const updatedOptions = selectedOptions.filter(o => o.code !== codeToRemove);
    setSelectedOptions(updatedOptions);
    form.setValue(name, updatedOptions.map(o => `${o.code} - ${o.description}`).join("; "));
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay to allow click on results
    setTimeout(() => setShowResults(false), 200);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      rules={required ? { required: "Campo obrigatório" } : {}}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <div className="space-y-2 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="pl-10 h-11"
              />
            </div>
            
            {/* Results dropdown */}
            {showResults && filteredOptions.length > 0 && (
              <div 
                ref={resultsRef}
                className="absolute z-50 w-full bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto animate-fade-in"
                style={{ top: '100%' }}
              >
                {filteredOptions.map((item) => (
                  <div
                    key={item.code}
                    onClick={() => handleOptionSelect(item)}
                    className="flex items-center gap-2 p-3 hover:bg-muted cursor-pointer border-b border-border/50 last:border-b-0"
                  >
                    <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
                      {item.code}
                    </Badge>
                    {item.shortCode && (
                      <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
                        {item.shortCode}
                      </Badge>
                    )}
                    <div className="text-sm text-foreground">{item.description}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {showResults && searchTerm.length > 0 && filteredOptions.length === 0 && (
              <div 
                ref={resultsRef}
                className="absolute z-50 w-full bg-background border border-border rounded-md shadow-lg p-3 animate-fade-in"
                style={{ top: '100%' }}
              >
                <div className="text-sm text-muted-foreground text-center">{emptyMessage}</div>
              </div>
            )}
            
            {/* Selected Options (for multiple) */}
            {multiple && selectedOptions.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-foreground">Selecionados:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedOptions.map((option) => (
                    <div
                      key={option.code}
                      className="flex items-center gap-1 bg-muted border rounded px-2 py-1"
                    >
                      <Badge variant="outline" className="font-mono text-xs">
                        {option.code}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(option.code)}
                        className="h-4 w-4 p-0 hover:bg-muted/80 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};