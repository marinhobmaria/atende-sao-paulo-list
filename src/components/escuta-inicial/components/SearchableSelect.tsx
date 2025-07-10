import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, ChevronDown, X } from "lucide-react";
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
    }
    setShowResults(false);
    setSearchTerm("");
  };

  const removeOption = (codeToRemove: string) => {
    const updatedOptions = selectedOptions.filter(o => o.code !== codeToRemove);
    setSelectedOptions(updatedOptions);
    form.setValue(name, updatedOptions.map(o => `${o.code} - ${o.description}`).join("; "));
  };

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
          <div className="space-y-2">
            <Popover open={showResults} onOpenChange={setShowResults}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between h-11 px-4",
                    !searchTerm && "text-muted-foreground"
                  )}
                  onClick={() => setShowResults(!showResults)}
                >
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>{searchTerm || placeholder}</span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Pesquise ou selecione por código ou descrição"
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup>
                      {filteredOptions.map((item) => (
                        <CommandItem
                          key={item.code}
                          value={item.code}
                          onSelect={() => handleOptionSelect(item)}
                          className="flex items-center gap-2 p-3 hover:bg-muted cursor-pointer"
                        >
                          <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
                            {item.code}
                          </Badge>
                          {item.shortCode && (
                            <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
                              {item.shortCode}
                            </Badge>
                          )}
                          <div className="text-sm text-gray-900">{item.description}</div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            {/* Selected Options (for multiple) */}
            {multiple && selectedOptions.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Selecionados:</div>
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