import { withDefaultProps } from '../../utils/with-default-props'
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'
import React from 'react'
import { ElementProps } from '../../utils/element-props'
import classNames from 'classnames'


const classPrefix = `am-grid`

/* ----------------------------------------- Grid ----------------------------------------- */
type Gap = number | number[] | string | string[]

export interface GridProps extends ElementProps {
  columns: number
  gap?: Gap
}


// 获得 CSS 变量，作为 style
const getCssVarStyle = {
  gird: (gapCol: Gap, gapRow: Gap, columns: number) => {
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

const defaultProps = {
  gap: 0,
}

const Grid = withDefaultProps(defaultProps)<GridProps>(props => {
  const { className, children, style } = props

  const createStyle = (style = {}, { columns, gap }): any => {
    if (gap) {
      const [horizontalGap, verticalGap] = Array.isArray(gap) ? gap : [gap, gap]
      const gridStyle = getCssVarStyle.gird(
        typeof verticalGap === 'number' ? `${verticalGap}px` : verticalGap,
        typeof horizontalGap === 'number' ? `${horizontalGap}px` : horizontalGap,
        columns
      )
      Object.assign(style, gridStyle)
    }
    return style
  }

  return (
    <div
      className={classNames(`${classPrefix}`, className)}
      style={createStyle(style, props)}
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
  const { className, children, span, style = {} } = props

  Object.assign(style,
    getCssVarStyle.gridItem(span)
  )

  return (
    <div
      className={classNames(`${classPrefix}-item`, className)}
      style={style}
    >
      {children}
    </div>
  )
})

export default attachPropertiesToComponent(Grid, {
  Item: GridItem,
})
