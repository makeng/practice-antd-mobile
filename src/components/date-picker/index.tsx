import React, {useMemo, useCallback} from 'react'
import Picker, {PickerProps} from '../picker'
import {useControllableValue} from 'ahooks'
import dayjs from 'dayjs'
import {generateIntArray} from '../../utils/generate-int-array'
import {ElementProps} from '../../utils/element-props'
import {withDefaultProps} from '../../utils/with-default-props'

export type DatePickerProps = Pick<
  PickerProps,
  | 'onCancel'
  | 'onClose'
  | 'visible'
  | 'confirmText'
  | 'cancelText'
  | 'getContainer'
> & {
  value?: Date
  defaultValue?: Date
  onSelect?: (value: Date) => void
  onConfirm?: (value: Date) => void
  min?: Date
  max?: Date
} & ElementProps

const thisYear = new Date().getFullYear()

const defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
}

const DatePicker = withDefaultProps(defaultProps)<DatePickerProps>(props => {
  const [value, setValue] = useControllableValue<Date>(props, {
    trigger: 'onConfirm',
  })

  function columns(selected: string[]) {
    const years: string[] = []
    const minYear = props.min.getFullYear()
    const minMonth = props.min.getMonth() + 1
    const minDate = props.min.getDate()
    const maxYear = props.max.getFullYear()
    const maxMonth = props.max.getMonth() + 1
    const maxDate = props.max.getDate()
    const firstDayInSelectedMonth = dayjs(
      convertStringArrayToDate([selected[0], selected[1], '1'])
    )
    const selectedYear = firstDayInSelectedMonth.year()
    const selectedMonth = firstDayInSelectedMonth.month() + 1

    for (let i = minYear; i <= maxYear; i++) {
      years.push(i.toString())
    }
    const months = generateIntArray(1, 12)
      .filter(v => {
        if (selectedYear === minYear && v < minMonth) {
          return false
        }
        if (selectedYear === maxYear && v > maxMonth) {
          return false
        }
        return true
      })
      .map(v => v.toString())
    let days: string[] = []
    days = generateIntArray(1, firstDayInSelectedMonth.daysInMonth())
      .filter(v => {
        if (
          selectedYear === minYear &&
          selectedMonth === minMonth &&
          v < minDate
        ) {
          return false
        }
        if (
          selectedYear === maxYear &&
          selectedMonth === maxMonth &&
          v > maxDate
        ) {
          return false
        }
        return true
      })
      .map(v => v.toString())
    return [years, months, days]
  }

  const pickerValue = useMemo(() => convertDateToStringArray(value), [value])

  const onConfirm = useCallback(
    (val: string[]) => {
      setValue(convertStringArrayToDate(val))
    },
    [setValue]
  )

  const onSelect = useCallback(
    (val: string[]) => {
      props.onSelect?.(convertStringArrayToDate(val))
    },
    [props.onSelect]
  )

  return (
    <Picker
      columns={columns}
      value={pickerValue}
      onCancel={props.onCancel}
      onClose={props.onClose}
      visible={props.visible}
      confirmText={props.confirmText}
      cancelText={props.cancelText}
      onConfirm={onConfirm}
      onSelect={onSelect}
      getContainer={props.getContainer}
    />
  )
})

function convertDateToStringArray(date: Date | undefined | null): string[] {
  if (!date) return []
  return [
    date.getFullYear().toString(),
    (date.getMonth() + 1).toString(),
    date.getDate().toString(),
  ]
}

function convertStringArrayToDate(value: string[]): Date {
  const [yearString = '1900', monthString = '1', dateString = '1'] = value
  return new Date(
    parseInt(yearString),
    parseInt(monthString) - 1,
    parseInt(dateString)
  )
}

export default DatePicker
