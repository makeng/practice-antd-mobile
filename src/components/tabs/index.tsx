import { FC, ReactNode, ReactElement, ComponentProps } from 'react'
import React from 'react'
import { useControllableValue } from 'ahooks'
import classNames from 'classnames'
import { ElementProps } from '../../utils/element-props'

const classPrefix = `am-tabs`

/* ----------------------------------------- TabPane ----------------------------------------- */
export type TabPaneProps = {
  title: ReactNode
  forceRender?: boolean
}

const TabPane: FC<TabPaneProps> = () => {
  return null
}

/* ----------------------------------------- Tabs ----------------------------------------- */
export type TabsProps = {
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (val: string) => void
} & ElementProps

const Tabs: FC<TabsProps> & {
  TabPane: typeof TabPane
} = props => {
  const { className, style, children } = props

  return (
    <div
      className={classNames(classPrefix, className)}
      style={style}
    >
      {children}
    </div>
  )
}

Tabs.TabPane = TabPane

export default Tabs
