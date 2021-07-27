import React, {useState, useEffect, ReactNode, useMemo} from 'react'
import Popup, {PopupProps} from '../popup'
import {useControllableValue} from 'ahooks'

import {Column} from './column'
import {withDefaultProps} from '../../utils/with-default-props'
import {attachPropertiesToComponent} from '../../utils/attach-properties-to-component'
import {Cascader} from './cascader'
import {ElementProps} from '../../utils/element-props'
import classNames from 'classnames'

const classPrefix = `am-picker`

export type PickerValue = string | null

export type PickerColumnItem = {
  label: string
  value: string
}

export type PickerColumn = (string | PickerColumnItem)[]

export type PickerProps = {
  columns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[])
  value?: PickerValue[]
  defaultValue?: PickerValue[]
  onSelect?: (value: PickerValue[]) => void
  onConfirm?: (value: PickerValue[]) => void
  onCancel?: () => void
  onClose?: () => void
  visible?: boolean
  confirmText?: string
  cancelText?: string
  children?: (items: (PickerColumnItem | null)[]) => ReactNode
} & Pick<PopupProps, 'getContainer'> &
  ElementProps

const Picker = withDefaultProps({
  confirmText: '确定',
  cancelText: '取消',
})<PickerProps>(props => {
  const controllable = useControllableValue<PickerValue[]>(props, {
    trigger: 'onConfirm',
    defaultValue: [],
  })
  const value = controllable[0] as PickerValue[]
  const setValue = controllable[1]

  const [innerValue, setInnerValue] = useState<PickerValue[]>(value)
  useEffect(() => {
    if (!props.visible) {
      setInnerValue(value)
    }
  }, [props.visible])

  const columns = useMemo(() => {
    const columns =
      typeof props.columns === 'function'
        ? props.columns(innerValue)
        : props.columns
    return columns.map(column =>
      column.map(item =>
        typeof item === 'string'
          ? {
              label: item,
              value: item,
            }
          : item
      )
    )
  }, [props.columns, innerValue])

  const widget = (
    <Popup
      visible={props.visible}
      position='bottom'
      onMaskClick={() => {
        props.onCancel?.()
        props.onClose?.()
      }}
      getContainer={props.getContainer}
      destroyOnClose
    >
      <div
        className={classNames(classPrefix, props.className)}
        style={props.style}
      >
        <div className={`${classPrefix}-header`}>
          <a
            className={`${classPrefix}-header-button`}
            onClick={() => {
              props.onCancel?.()
              props.onClose?.()
            }}
          >
            {props.cancelText}
          </a>
          <a
            className={`${classPrefix}-header-button`}
            onClick={() => {
              setValue(innerValue)
              props.onClose?.()
            }}
          >
            {props.confirmText}
          </a>
        </div>
        <div className={`${classPrefix}-columns`}>
          {columns.map((column, index) => (
            <Column
              key={index}
              column={column}
              value={innerValue[index]}
              onSelect={val => {
                setInnerValue(prev => {
                  const nextValue = [...prev]
                  nextValue[index] = val
                  props.onSelect?.(nextValue)
                  return nextValue
                })
              }}
            />
          ))}
          <div className={`${classPrefix}-mask ${classPrefix}-mask-top`} />
          <div className={`${classPrefix}-mask ${classPrefix}-mask-bottom`} />
        </div>
      </div>
    </Popup>
  )

  const label = useMemo(() => {
    if (!props.children) return null
    const items = columns.map(
      (column, index) =>
        column.find(item => item.value === value[index]) ?? null
    )
    return props.children(items)
  }, [value])

  return (
    <>
      {widget}
      {label}
    </>
  )
})

export default attachPropertiesToComponent(Picker, {
  Cascader: Cascader,
})
