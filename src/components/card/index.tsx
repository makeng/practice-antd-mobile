import { FC, ReactNode } from 'react'
import React from 'react'
import classNames from 'classnames'
import { ElementProps } from '../../utils/element-props'

const classPrefix = `am-card`

export interface CardProps extends ElementProps {
  title?: ReactNode
  extra?: ReactNode
  onClick?: (event: React.MouseEvent) => void
  onBodyClick?: (event: React.MouseEvent) => void
  onHeaderClick?: (event: React.MouseEvent) => void
}

const Card: FC<CardProps> = props => {
  const { className, style, children } = props
  const { title, extra, onClick, onBodyClick, onHeaderClick } = props

  return (
    <div
      className={classNames(classPrefix, className)}
      style={style}
      onClick={onClick}
    >
      {(title || extra) && (
        <div
          className={`${classPrefix}-header`}
          onClick={onHeaderClick}
        >
          <div className={`${classPrefix}-header-title`}>{title}</div>
          {extra}
        </div>
      )}
      {children && (
        <div
          className={`${classPrefix}-body`}
          onClick={onBodyClick}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Card
