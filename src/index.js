import React, {Component} from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

export default function EnhanceLoadable(opt) {
  return class EnhanceComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    fetchComponent = async () => {
      const { default: component } = await importComponent();

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
      return ()
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
