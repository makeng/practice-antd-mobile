import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { ElementProps } from '../../utils/element-props'
import { RightOutlined } from '@ant-design/icons'

const classPrefix = `am-list`

/* ----------------------------------------- ListItem ----------------------------------------- */
type ListItemProps = {
  title?: ReactNode
  children?: ReactNode
  description?: ReactNode
  prefix?: ReactNode // 左区域
  extra?: ReactNode // 右区域
  showArrow?: boolean
  onClick?: () => void
} & ElementProps

const ListItem: FC<ListItemProps> = props => {
  const { className, style, children } = props // 常规属性
  const { title, prefix, extra, description, onClick } = props
  const showArrow = props.showArrow || !!onClick
  const itemClassName = `${classPrefix}-item`
  const classNameList = classNames(classPrefix, itemClassName, className)

  return (
    <div
      className={classNameList}
      style={style}
      onClick={() => onClick && onClick()}
    >
      <div className={`${itemClassName}-content`}>
        {/* 前 */}
        {prefix && (
          <div className={`${itemClassName}-content-prefix`}>{prefix}</div>
        )}
        {/* 中 */}
        <div className={`${itemClassName}-content-main`}>
          {title && (
            <div className={`${itemClassName}-title`}>{title}</div>
          )}
          <div>{children}</div>
          {description && (
            <div className={`${itemClassName}-description`}>{description}</div>
          )}
        </div>
        {/* 后 */}
        {extra && (
          <div className={`${itemClassName}-content-extra`}>{extra}</div>
        )}
        {showArrow && (
          <div className={`${itemClassName}-content-arrow`}>
            <RightOutlined />
          </div>
        )}
      </div>
    </div>
  )
}

/* ----------------------------------------- List ----------------------------------------- */
type ListProps = {
  mode?: 'default' | 'card' // 默认是整宽的列表，card 模式下展示为带 margin 和圆角的卡片
} & ElementProps

const List: FC<ListProps> & { Item: typeof ListItem } = props => {
  const { className, style, children } = props // 常规属性
  const { mode } = props

  const classNameList = classNames(
    classPrefix,
    `${classPrefix}-${mode}`,
    className
  )

  return (
    <div className={classNameList} style={style}>
      {children}
    </div>
  )
}

List.Item = ListItem
List.defaultProps = {
  mode: 'default',
}

export default List
