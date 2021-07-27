import React, {useRef, useState, useLayoutEffect} from 'react'
import classNames from 'classnames'
import {withDefaultProps} from '../../utils/with-default-props'
import {ElementProps} from '../../utils/element-props'

const classPrefix = `am-ellipsis`

export type EllipsisProps = {
  content: string
  direction?: 'start' | 'end'
  rows?: number
} & ElementProps

const defaultProps = {
  direction: 'end',
  rows: 1,
}

const Ellipsis = withDefaultProps(defaultProps)<EllipsisProps>(props => {
  const originRef = useRef<HTMLDivElement>(null)

  const [ellipsised, setEllipsised] = useState<string>('')

  useLayoutEffect(() => {
    const origin = originRef.current
    if (!origin) return
    const originStyle = window.getComputedStyle(origin)
    const container = document.createElement('div')
    const styleNames: string[] = Array.prototype.slice.apply(originStyle)
    styleNames.forEach(name => {
      container.style.setProperty(name, originStyle.getPropertyValue(name))
    })
    container.style.position = 'fixed'
    container.style.left = '999999px'
    container.style.top = '999999px'
    container.style.zIndex = '-1000'
    container.style.height = 'auto'
    container.style.minHeight = 'auto'
    container.style.maxHeight = 'auto'
    container.style.textOverflow = 'clip'
    container.style.whiteSpace = 'normal'
    container.style.webkitLineClamp = 'unset'
    container.style.webkitBoxOrient = 'unset'
    container.style.display = 'block'
    const lineHeight = pxToNumber(originStyle.lineHeight)
    const maxHeight =
      Math.floor(lineHeight) * props.rows +
      pxToNumber(originStyle.paddingTop) +
      pxToNumber(originStyle.paddingBottom)
    container.innerText = props.content
    document.body.appendChild(container)
    if (container.offsetHeight <= maxHeight) {
      setEllipsised(props.content)
    } else {
      const end = props.content.length
      function check(left: number, right: number): string {
        if (right - left <= 1) {
          if (props.direction === 'end') {
            return props.content.slice(0, left) + '...'
          } else {
            return '...' + props.content.slice(right, end)
          }
        }
        const middle = Math.round((left + right) / 2)
        if (props.direction === 'end') {
          container.innerText = props.content.slice(0, middle) + '...'
        } else {
          container.innerText = '...' + props.content.slice(middle, end)
        }
        if (container.offsetHeight <= maxHeight) {
          if (props.direction === 'end') {
            return check(middle, right)
          } else {
            return check(left, middle)
          }
        } else {
          if (props.direction === 'end') {
            return check(left, middle)
          } else {
            return check(middle, right)
          }
        }
      }
      setEllipsised(check(0, props.content.length))
    }
    document.body.removeChild(container)
  }, [props.content, props.rows, props.direction])

  return (
    <div
      ref={originRef}
      className={classNames(classPrefix, props.className)}
      style={props.style}
    >
      {ellipsised}
    </div>
  )
})

function pxToNumber(value: string | null): number {
  if (!value) return 0
  const match = value.match(/^\d*(\.\d*)?/)
  return match ? Number(match[0]) : 0
}

export default Ellipsis
