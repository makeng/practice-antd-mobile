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
  const childrenRecord: Record<string, ReactNode> = {}
  let firstActiveKey: string | undefined = undefined

  const panes: ReactElement<ComponentProps<typeof TabPane>>[] = []

  React.Children.forEach(props.children, (child, index) => {
    if (!React.isValidElement(child)) return
    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) {
      firstActiveKey = key
    }
    childrenRecord[key] = child.props.children
    panes.push(child)
  })

  const [activeKey, setActiveKey] = useControllableValue<string>(props, {
    valuePropName: 'activeKey',
    defaultValuePropName: 'defaultActiveKey',
    defaultValue: firstActiveKey,
    trigger: 'onChange',
  })

  return (
    <div
      className={classNames(classPrefix, props.className)}
      style={props.style}
    >
      <div className={`${classPrefix}-tab-list`}>
        {panes.map(pane => (
          <div key={pane.key} className={`${classPrefix}-tab-wrapper`}>
            <div
              onClick={() => {
                setActiveKey(pane.key?.toString()!)
              }}
              className={classNames(`${classPrefix}-tab`, {
                [`${classPrefix}-tab-active`]: pane.key === activeKey,
              })}
            >
              {pane.props.title}
            </div>
          </div>
        ))}
      </div>
      {panes.map(pane => {
        if (pane.props.children === undefined) {
          return null
        }
        if (pane.key === activeKey) {
          return (
            <div key={pane.key} className={`${classPrefix}-content`}>
              {pane.props.children}
            </div>
          )
        }
        if (pane.props.forceRender) {
          return (
            <div key={pane.key} style={{ display: 'none' }}>
              {pane.props.children}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

Tabs.TabPane = TabPane

export default Tabs
