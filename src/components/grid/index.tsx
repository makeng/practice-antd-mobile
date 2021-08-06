import { withDefaultProps } from '../../utils/with-default-props'
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'
import React from 'react'
import { ElementProps } from '../../utils/element-props'
import classNames from 'classnames'


const classPrefix = `am-grid`
// 获得 CSS 变量，作为 style
const getCssVarStyle = {
  gird: (gapCol: Gap, gapRow: Gap, columns: Columns) => {
    return {
      '--horizontal-gap': gapCol,
      '--vertical-gap': gapRow,
      '--columns': columns
    }
  },
  gridItem: (span: number) => {
    return { '--item-span': span }
  }
}

/* ----------------------------------------- Grid ----------------------------------------- */
type Gap = number | number[] | string | string[]
type Columns = number

export interface GridProps extends ElementProps {
  columns: Columns
  gap?: Gap
}

const defaultProps = {
  gap: 0,
}

const Grid = withDefaultProps(defaultProps)<GridProps>(props => {
  const { className, children, style } = props
  const { columns, gap } = props
  // 构建样式
  const createStyle = (styleOrigin = {}, col: Columns, gap: Gap): object => {
    if (gap) {
      const [horizontalGap, verticalGap] = Array.isArray(gap) ? gap : [gap, gap]
      const gridStyle = getCssVarStyle.gird(
        typeof verticalGap === 'number' ? `${verticalGap}px` : verticalGap,
        typeof horizontalGap === 'number' ? `${horizontalGap}px` : horizontalGap,
        columns
      )
      Object.assign(styleOrigin, gridStyle)
    }
    return styleOrigin
  }

  return (
    <div
      className={classNames(`${classPrefix}`, className)}
      style={createStyle(style, columns, gap)}
    >
      {children}
    </div>
  )
})

/* ----------------------------------------- GridItem ----------------------------------------- */
export type GridItemProps = {
  span?: number
} & ElementProps

const GridItem = withDefaultProps({
  span: 1,
})<GridItemProps>(props => {
  const { className, children, style, span } = props
  // 构建样式
  const createStyle = (styleOrigin = {}, value: number): object => {
    return Object.assign(styleOrigin,
      getCssVarStyle.gridItem(value)
    )
  }

  return (
    <div
      className={classNames(`${classPrefix}-item`, className)}
      style={createStyle(style, span)}
    >
      {children}
    </div>
  )
})

export default attachPropertiesToComponent(Grid, {
  Item: GridItem,
})
