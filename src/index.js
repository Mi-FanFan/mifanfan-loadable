import React, {Component} from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

/**
 * {
 *   loader: 异步获取组件的回调函数
 *   loading: loading动画，根据状态，传入不同的参数。
 *   timeout： 如果超过这个时间，那么会给loading组件传递一个timeOut为true的props
 * }
 * @param opt
 * @returns {*}
 * @constructor
 */
export default function EnhanceLoadable(opt) {

  const {loader, loading: LoadingComponent, timeout} = opt
  return class EnhanceComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
        timeOut: false,
      };
    }

    fetchComponent = async () => {
      const { default: component } = await loader();

      this.setState({
        component: component
      });

    }

    componentDidMount() {
      try{
        this.fetchComponent()
      }catch(e) {
        this.fetchComponent()
      }
    }

    render() {
      const {component: C, timeOut} = this.state


      return C ? <C {...this.props} /> : <LoadingComponent timeOut={timeOut}/>
    }
  }

  //为高阶组件设置displayName
  const WrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'

  EnhanceLoadable.displayName = `hocLoadable(${WrappedComponentName})`

  hoistNonReactStatic(EnhanceLoadable, WrappedComponent)

  return EnhanceLoadable

}
