'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = EnhanceLoadable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function EnhanceLoadable(opt) {
  var loader = opt.loader,
      timeout = opt.timeout,
      doneCallback = opt.doneCallback,
      errorCallback = opt.errorCallback,
      LoadingComponent = opt.loading;

  var EnhanceComponent = function (_Component) {
    (0, _inherits3.default)(EnhanceComponent, _Component);

    function EnhanceComponent(props) {
      var _this2 = this;

      (0, _classCallCheck3.default)(this, EnhanceComponent);

      var _this = (0, _possibleConstructorReturn3.default)(this, (EnhanceComponent.__proto__ || (0, _getPrototypeOf2.default)(EnhanceComponent)).call(this, props));

      _this.fetchComponent = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _ref2, component, WrappedComponentName;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return loader();

              case 2:
                _ref2 = _context.sent;
                component = _ref2.default;

                // 为高阶组件设置displayName
                WrappedComponentName = component.displayName || component.name || 'Component';


                EnhanceComponent.displayName = 'hocLoadable(' + WrappedComponentName + ')';

                (0, _hoistNonReactStatics2.default)(EnhanceComponent, component);

                _this.setState({
                  component: component
                });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));


      _this.state = {
        component: null,
        timeOut: false,
        error: null
      };
      return _this;
    }

    (0, _createClass3.default)(EnhanceComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this3 = this;

        var component = this.state.component;

        try {
          this.fetchComponent();
        } catch (e) {
          this.setState({
            error: null
          });
          if (errorCallback && typeof errorCallback === 'function') {
            errorCallback();
          }
          this.fetchComponent();
        }

        if (timeout) {
          setTimeout(function () {
            if (component) {
              _this3.setState({ timeOut: true });
            }
          }, timeout);
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(preProps, preState) {
        var component = this.state.component;

        if (!preState.component && component) {
          if (doneCallback && typeof doneCallback === 'function') {
            doneCallback();
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            C = _state.component,
            timeOut = _state.timeOut,
            error = _state.error;


        return C ? _react2.default.createElement(C, this.props) : _react2.default.createElement(LoadingComponent, {
          error: error,
          timeOut: timeOut,
          retry: this.fetchComponent
        });
      }
    }]);
    return EnhanceComponent;
  }(_react.Component);

  return EnhanceComponent;
}