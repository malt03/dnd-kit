'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

const hiddenStyles = {
  display: 'none'
};
function HiddenText({
  id,
  value
}) {
  return React__default.createElement("div", {
    id: id,
    style: hiddenStyles
  }, value);
}

const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(100%)',
  whiteSpace: 'nowrap'
};
function LiveRegion({
  id,
  announcement
}) {
  return React__default.createElement("div", {
    id: id,
    style: visuallyHidden,
    role: "status",
    "aria-live": "assertive",
    "aria-atomic": true
  }, announcement);
}

function useAnnouncement() {
  const [announcement, setAnnouncement] = React.useState('');
  const announce = React.useCallback(value => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}

exports.HiddenText = HiddenText;
exports.LiveRegion = LiveRegion;
exports.useAnnouncement = useAnnouncement;
//# sourceMappingURL=accessibility.cjs.development.js.map
