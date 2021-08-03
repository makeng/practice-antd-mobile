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

// 获得 CSS 属性
const getCssProp = {
  gridColGap: (gap: Gap) => ({ 'row-gap': gap }),
  getGridRowGap: (gap: Gap) => ({ 'column-gap': gap }),
  getGridColumns: (columns: number) => ({ 'grid-template-columns': `repeat(${columns}, minmax(0, 1fr))` }),
  getGridItemColumnEnd: (span: number) => ({ 'grid-column-end': `span ${span}` })
}

const defaultProps = {
  gap: 0,
}

const Grid = withDefaultProps(defaultProps)<GridProps>(props => {
  const { className, children, style } = props

  const createStyle = (style = {}, { columns, gap }): any => {
    if (gap) {
      const [horizontalGap, verticalGap] = Array.isArray(gap) ? gap : [gap, gap]
      Object.assign(style,
        getCssProp.gridColGap(typeof verticalGap === 'number' ? `${verticalGap}px` : verticalGap),
        getCssProp.getGridRowGap(typeof horizontalGap === 'number' ? `${horizontalGap}px` : horizontalGap),
        getCssProp.getGridColumns(columns)
      )
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
    getCssProp.getGridItemColumnEnd(span)
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
