import React, { Component } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

/**
 * {
 *   loader: 异步获取组件的回调函数
 *   loading: loading动画，根据状态，传入不同的参数。
 *   timeout： 如果超过这个时间，那么会给loading组件传递一个timeOut为true的props
 * }
 * @param {object} opt 配置对象
 * @returns {Component} 返回一个react组件
 * @constructor
 */
export default function EnhanceLoadable(opt) {
  const {
    loader,
    timeout,
    doneCallback,
    errorCallback,
    loading: LoadingComponent,
  } = opt

  class EnhanceComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
        timeOut: false,
        error: null,
      };
    }

    componentDidMount() {
      const { component } = this.state
      try {
        this.fetchComponent()
      } catch (e) {
        this.setState({
          error: null,
        })
        if (errorCallback && typeof errorCallback === 'function') {
          errorCallback()
        }
        this.fetchComponent()
      }

      if (timeout) {
        setTimeout(() => {
          if (component) {
            this.setState({ timeOut: true })
          }
        }, timeout)
      }
    }

    componentDidUpdate(preProps, preState) {
      const { component } = this.state
      if (!preState.component && component) {
        if (doneCallback && typeof doneCallback === 'function') {
          doneCallback()
        }
      }
    }

    fetchComponent = async () => {
      const { default: component } = await loader();
      // 为高阶组件设置displayName
      const WrappedComponentName = component.displayName
            || component.name
            || 'Component'

      EnhanceComponent.displayName = `hocLoadable(${WrappedComponentName})`

      hoistNonReactStatic(EnhanceComponent, component)

      this.setState({
        component,
      });
    }

    render() {
      const { component: C, timeOut, error } = this.state

      return C
        ? <C {...this.props} />
        : (
          <LoadingComponent
            error={error}
            timeOut={timeOut}
            retry={this.fetchComponent}
          />
        )
    }
  }

  return EnhanceComponent
}
