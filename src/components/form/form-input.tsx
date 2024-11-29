"use client";

import { ElementType } from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormInputProps<T, E extends React.ElementType> = {
  input: E;
  name: T;
  label?: string | React.ReactNode;
  description?: string;
  classNames?: Record<
    "container" | "label" | "input" | "description" | "error",
    string
  >;
} & Omit<React.ComponentProps<E>, "name">;

export const FormInput = <T, E extends React.ElementType>({
  input,
  name,
  className,
  label,
  description,
  classNames,
  ...rest
}: FormInputProps<T, E>) => {
  const Component: ElementType = input;

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name as string}
      render={({ field }) => (
        <FormItem className={cn(classNames?.container)}>
          {typeof label === "string" ? (
            <FormLabel className={cn(classNames?.label)}>{label}</FormLabel>
          ) : (
            label
          )}
          <FormControl>
            <Component
              {...field}
              {...rest}
              className={cn(className, classNames?.input)}
            />
          </FormControl>
          <FormDescription className={cn(classNames?.description)}>
            {description}
          </FormDescription>
          <FormMessage className={cn(classNames?.error)} />
        </FormItem>
      )}
    />
  );
};
