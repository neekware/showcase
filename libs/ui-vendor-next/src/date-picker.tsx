'use client';

import * as React from 'react';
import { type DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Icon, mdiCalendar } from '@lib/ui-icon-next';
import { cn } from '@lib/ui-vendor-next';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface DatePickerProps {
  initialDate?: Date;
  onSelectDate: (date: Date) => void; // eslint-disable-line no-unused-vars
  placeholder?: string;
}

function DatePicker({ initialDate, onSelectDate, placeholder = 'Pick a date' }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <Icon path={mdiCalendar} className="mr-2 size-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate: Date | undefined) => {
            if (newDate) {
              setDate(newDate);
              onSelectDate(newDate);
            }
          }}
          // initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

type DateFormatType = string | number | Date;

interface DatePickerWithRangeProps {
  className?: string;
  initialDateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange) => void; // eslint-disable-line no-unused-vars
}

const today = new Date();
const defaultDateRange = {
  from: today,
  to: addDays(today, 20),
};

function DatePickerWithRange({
  className,
  initialDateRange = defaultDateRange,
  onDateRangeChange,
}: DatePickerWithRangeProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(initialDateRange);

  const handleDateSelects = (range: DateRange | undefined) => {
    setDateRange(range);
    if (onDateRangeChange && range) {
      onDateRangeChange(range);
    }
  };

  const renderDateLabel = (newDateRange: DateRange | undefined) => {
    if (!newDateRange) {
      return <span>Pick a date</span>;
    }
    const { from, to } = newDateRange;
    if (to) {
      return (
        <>
          {format(from as DateFormatType, 'LLL dd, y')} - {format(to, 'LLL dd, y')}
        </>
      );
    }
    return format(from as DateFormatType, 'LLL dd, y');
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground'
            )}
          >
            <Icon path={mdiCalendar} className="mr-2 size-4" />
            {renderDateLabel(dateRange)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            // initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateSelects}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export {
  type DatePickerProps,
  DatePicker,
  type DateFormatType,
  type DatePickerWithRangeProps,
  DatePickerWithRange,
};
