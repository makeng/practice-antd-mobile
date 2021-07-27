import React, {FC} from 'react'
import classNames from 'classnames'
import Loading from '../loading'
import {ComponentCommonProps} from "antd-mobile/src/types";

const classPrefix = `am-button`

export interface ButtonProps extends ComponentCommonProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger',
  fill?: 'solid' | 'outline' | 'none'
  size?: 'mini' | 'small' | 'middle' | 'large'
  type?: 'submit' | 'reset' | 'button'
  loadingText?: string
  block?: boolean
  disabled?: boolean
  loading?: boolean
  children?: any
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: FC<ButtonProps> = props => {
  const {className, style} = props
  const {children, color, fill, block, size, loading, loadingText, type, onClick} = props
  const disabled = props.disabled || loading

  return (
    <button
      className={classNames(
        classPrefix,
        className,
        color && `${classPrefix}-${color}`,
        fill && `${classPrefix}-fill-${fill}`,
        size && `${classPrefix}-${size}`,
        disabled && `${classPrefix}-disabled`,
        block && `${classPrefix}-block`,
        loading && `${classPrefix}-loading`,
      )}
      style={style}
      type={type}
      onClick={onClick}
    >
      {loading
        ? (
          <>
            <div className={`${classPrefix}-loading-wrapper`}>
              <Loading color='currentColor' size={props.size}/>
              {loadingText}
            </div>
          </>)
        : (
          children
        )}
    </button>
  )
}

Button.defaultProps = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  type: 'button',
}

export default Button
