import classNames from 'classnames'
import React, {useEffect, useState, useRef} from 'react'
import {CSSTransition} from 'react-transition-group'
import {ElementProps} from '../../utils/element-props'
import {useInitialized} from '../../utils/use-initialized'
import {withDefaultProps} from '../../utils/with-default-props'
import Mask from '../mask'
import {useLockScroll} from '../../utils/use-lock-scroll'
import {GetContainer, renderToContainer} from '../../utils/render-to-container'

const classPrefix = `am-popup`

export type PopupProps = {
  visible?: boolean
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  destroyOnClose?: boolean
  forceRender?: boolean
  getContainer?: GetContainer
  afterClose?: () => void
  position?: 'bottom' | 'top' | 'left' | 'right'
  bodyClassName?: string
  bodyStyle?: React.CSSProperties
  maskClassName?: string
  maskStyle?: React.CSSProperties
} & ElementProps

const defaultProps = {
  position: 'bottom',
  visible: false,
  getContainer: () => document.body,
}

const Popup = withDefaultProps(defaultProps)<PopupProps>(props => {
  // 动画执行完，才隐藏最外层
  const [hidden, setHidden] = useState(!props.visible)

  useEffect(() => {
    if (props.visible) {
      setHidden(false)
    }
  }, [props.visible])

  const afterClose = () => {
    setHidden(true)
    props.afterClose?.()
  }

  const cls = classNames(classPrefix, props.className, {
    [`${classPrefix}-hidden`]: hidden,
  })

  const bodyCls = classNames(
    `${classPrefix}-body`,
    props.bodyClassName,
    {
      [`${classPrefix}-body-hidden`]: !props.visible,
    },
    `${classPrefix}-body-position-${props.position}`
  )

  const initialized = useInitialized(props.visible || props.forceRender)

  const ref = useRef<HTMLDivElement>(null)

  useLockScroll(ref, props.visible)

  const node = (
    <div className={cls} style={props.style}>
      <Mask
        visible={props.visible}
        onMaskClick={props.onMaskClick}
        className={props.maskClassName}
        style={props.maskStyle}
        disableBodyScroll={false}
      />
      <CSSTransition
        classNames={`${classPrefix}-body`}
        in={props.visible}
        timeout={200}
        onExited={afterClose}
        unmountOnExit={props.destroyOnClose}
      >
        <div className={bodyCls} style={props.bodyStyle} ref={ref}>
          {initialized && props.children}
        </div>
      </CSSTransition>
    </div>
  )

  return renderToContainer(props.getContainer, node)
})

export default Popup
