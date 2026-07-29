/* @ds-bundle: {"format":3,"namespace":"FlavorStudioDesignSystem_8503a2","components":[{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TopNav","sourcePath":"components/navigation/TopNav.jsx"}],"sourceHashes":{"components/display/Avatar.jsx":"048a6e8fac62","components/display/Badge.jsx":"68fd366e1bc2","components/display/Card.jsx":"086c66e3eb0d","components/display/Tag.jsx":"d76aa80b303f","components/feedback/Dialog.jsx":"d6ddf1ce9bb2","components/forms/Button.jsx":"a5f5e52e38c8","components/forms/Checkbox.jsx":"7b924c07c1b2","components/forms/IconButton.jsx":"ffd200acdbb0","components/forms/Input.jsx":"bc4cc68f1747","components/forms/Radio.jsx":"c3339136b47a","components/forms/Select.jsx":"2ec178b5ba01","components/forms/Toggle.jsx":"181a816babd7","components/navigation/Tabs.jsx":"138fd4c4bd1d","components/navigation/TopNav.jsx":"eab35f774623","ui_kits/recipe-studio/App.jsx":"3e681e3690b1","ui_kits/recipe-studio/IngredientTable.jsx":"6ead371d6537","ui_kits/recipe-studio/NewIngredientModal.jsx":"47a7ec1b18bc","ui_kits/recipe-studio/RecipesList.jsx":"84a7611ffa22","ui_kits/recipe-studio/YieldCostPanel.jsx":"6b9b6ce1fd3c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FlavorStudioDesignSystem_8503a2 = window.FlavorStudioDesignSystem_8503a2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Avatar
 * User avatar: image, or initials on a deterministic brand-tinted background.
 * Common in the top-nav and on shared recipes.
 */
const BG_POOL = ['var(--blue-500)', 'var(--teal-500)', 'var(--slate-600)', 'var(--violet-500)', 'var(--lime-500)', 'var(--amber-500)'];
function Avatar({
  src,
  name = '',
  size = 36,
  ring = false,
  style = {},
  ...rest
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = BG_POOL[hash % BG_POOL.length];
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "fs-avatar",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: '50%',
      background: src ? 'var(--gray-200)' : bg,
      color: 'var(--white)',
      font: 'var(--font-body-medium)',
      fontSize: Math.round(size * 0.38),
      fontWeight: 'var(--weight-semibold)',
      overflow: 'hidden',
      flex: 'none',
      boxShadow: ring ? '0 0 0 2px var(--white), 0 0 0 3px var(--border-default)' : 'none',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '?');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Badge
 * Small status pill. Tones map to the semantic palette: blue (info/active),
 * green (success/final), amber (pending/testing), red (error), neutral.
 */
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  // 'soft' | 'solid' | 'outline'
  size = 'md',
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      soft: ['var(--gray-100)', 'var(--slate-600)'],
      solid: ['var(--slate-600)', '#fff']
    },
    blue: {
      soft: ['var(--blue-200)', 'var(--blue-700)'],
      solid: ['var(--primary)', '#fff']
    },
    green: {
      soft: ['var(--lime-100)', '#5e8f1c'],
      solid: ['var(--lime-500)', '#26410a']
    },
    teal: {
      soft: ['var(--teal-100)', '#0e7a64'],
      solid: ['var(--teal-500)', '#fff']
    },
    amber: {
      soft: ['var(--amber-100)', '#8a6410'],
      solid: ['var(--amber-500)', '#4a3403']
    },
    red: {
      soft: ['var(--red-100)', '#b3373b'],
      solid: ['var(--red-500)', '#fff']
    },
    violet: {
      soft: ['var(--violet-100)', '#5a44cc'],
      solid: ['var(--violet-500)', '#fff']
    }
  };
  const pair = tones[tone] || tones.neutral;
  const isSolid = variant === 'solid';
  const isOutline = variant === 'outline';
  const [bg, fg] = isSolid ? pair.solid : pair.soft;
  const sizes = {
    sm: {
      h: 18,
      px: 7,
      fs: 'var(--text-2xs)'
    },
    md: {
      h: 22,
      px: 9,
      fs: 'var(--text-xs)'
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "fs-badge",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: s.h,
      padding: `0 ${s.px}px`,
      background: isOutline ? 'transparent' : bg,
      color: isOutline ? pair.soft[1] : fg,
      border: isOutline ? `1px solid ${pair.soft[1]}` : 'none',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--font-eyebrow)',
      fontSize: s.fs,
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: isOutline ? pair.soft[1] : fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Card
 * The product's primary surface: white, softly rounded, whisper shadow.
 * Optional accent header bar (blue or slate) matching the Yield/Cost panel.
 */
function Card({
  children,
  title,
  icon,
  headerAccent,
  // 'blue' | 'slate' | undefined
  headerRight,
  padding = 20,
  collapsible = false,
  defaultCollapsed = false,
  style = {},
  bodyStyle = {},
  ...rest
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const accentBg = headerAccent === 'blue' ? 'var(--surface-accent)' : headerAccent === 'slate' ? 'var(--surface-accent-deep)' : 'transparent';
  const accentColor = headerAccent ? 'var(--white)' : 'var(--text-strong)';
  const hasHeader = title || icon || headerRight || collapsible;
  return /*#__PURE__*/React.createElement("section", _extends({
    className: "fs-card",
    style: {
      background: 'var(--surface-card)',
      border: headerAccent ? 'none' : '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
      ...style
    }
  }, rest), hasHeader && /*#__PURE__*/React.createElement("header", {
    onClick: collapsible ? () => setCollapsed(c => !c) : undefined,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: headerAccent ? '14px 18px' : '16px 20px',
      background: accentBg,
      color: accentColor,
      cursor: collapsible ? 'pointer' : 'default',
      borderBottom: headerAccent ? 'none' : '1px solid var(--border-default)'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      display: 'flex'
    }
  }, icon), title && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--font-section-title)',
      fontSize: headerAccent ? 'var(--text-base)' : 'var(--text-lg)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: headerAccent ? 'var(--tracking-wide)' : 'normal',
      textTransform: headerAccent ? 'uppercase' : 'none',
      color: accentColor
    }
  }, title), headerRight, collapsible && /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:up",
    style: {
      fontSize: 20,
      transform: collapsed ? 'rotate(180deg)' : 'none',
      transition: 'var(--transition-base)'
    }
  })), !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      padding,
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Tag
 * Recipe / ingredient tag chip. Soft slate-blue by default, removable, with an
 * optional leading color dot. Use for recipe tags, allergens, categories.
 */
function Tag({
  children,
  color,
  // optional dot color (CSS color or token var)
  removable = false,
  onRemove,
  onClick,
  selected = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "fs-tag",
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 28,
      padding: '0 12px',
      background: selected ? 'var(--blue-200)' : 'var(--gray-100)',
      color: selected ? 'var(--blue-700)' : 'var(--slate-700)',
      border: `1px solid ${selected ? 'var(--blue-300)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-pill)',
      font: 'var(--font-label)',
      fontSize: 'var(--text-sm)',
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      transition: 'var(--transition-base)',
      ...style
    }
  }, rest), color && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: color,
      flex: 'none'
    }
  }), children, removable && /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove && onRemove(e);
    },
    className: "iconify",
    "data-icon": "icon-park-outline:close",
    style: {
      fontSize: 14,
      color: 'var(--slate-400)',
      cursor: 'pointer',
      display: 'flex'
    }
  }));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Dialog (modal)
 * Centered white sheet over a dark scrim. Title + close, scrollable body,
 * right-aligned footer (ghost Cancel + primary action). Matches the
 * "New Ingredient" modal pattern.
 */
function Dialog({
  open = true,
  title,
  onClose,
  children,
  footer,
  width = 920,
  style = {},
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fs-dialog-scrim",
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(43, 59, 83, 0.55)',
      backdropFilter: 'blur(1px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      zIndex: 1000
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: "fs-dialog",
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      maxHeight: '88vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '22px 28px',
      borderBottom: '1px solid var(--border-default)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      flex: 1,
      font: 'var(--font-section-title)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--slate-700)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Close",
    onClick: onClose,
    className: "iconify",
    "data-icon": "icon-park-outline:close",
    style: {
      border: 'none',
      background: 'transparent',
      fontSize: 24,
      color: 'var(--slate-500)',
      cursor: 'pointer',
      display: 'flex'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '24px 28px'
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 14,
      padding: '18px 28px',
      borderTop: '1px solid var(--border-default)',
      flex: 'none'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Button
 * Primary action uses the sky-blue brand color; secondary is a white
 * outline; ghost is a quiet text/link button (very common in this product
 * for Cancel / Add actions). Rounded by default, pill optional.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0 12px',
      height: 30,
      font: 'var(--text-sm)',
      gap: 6
    },
    md: {
      padding: '0 18px',
      height: 38,
      font: 'var(--text-base)',
      gap: 8
    },
    lg: {
      padding: '0 26px',
      height: 46,
      font: 'var(--text-md)',
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--white)',
      border: '1px solid var(--primary)'
    },
    secondary: {
      background: 'var(--white)',
      color: 'var(--slate-700)',
      border: '1px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '1px solid transparent'
    },
    subtle: {
      background: 'var(--blue-100)',
      color: 'var(--blue-700)',
      border: '1px solid transparent'
    },
    danger: {
      background: 'var(--white)',
      color: 'var(--danger)',
      border: '1px solid var(--red-100)'
    }
  };
  const v = variants[variant] || variants.primary;
  const base = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    font: 'var(--font-body-medium)',
    fontSize: s.font,
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1,
    letterSpacing: '0.01em',
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    whiteSpace: 'nowrap',
    transition: 'var(--transition-base)',
    ...v,
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: base,
    "data-variant": variant,
    className: "fs-button"
  }, rest), iconLeft, children && /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Checkbox
 * Square control with brand-blue fill + white check when selected.
 * Renders an optional label to the right.
 */
function Checkbox({
  checked,
  defaultChecked,
  label,
  hint,
  disabled = false,
  size = 'md',
  onChange,
  id,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const dim = size === 'sm' ? 18 : 22;
  const fieldId = id || React.useId();
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'inline-flex',
      alignItems: hint ? 'flex-start' : 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: "checkbox",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      flex: 'none',
      width: dim,
      height: dim,
      marginTop: hint ? 1 : 0,
      borderRadius: 'var(--radius-xs)',
      background: on ? 'var(--primary)' : 'var(--white)',
      border: `2px solid ${on ? 'var(--primary)' : 'var(--slate-300)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--white)',
      fontSize: dim - 4,
      transition: 'var(--transition-base)'
    }
  }, on && /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:check"
  })), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--slate-700)'
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-caption)',
      color: 'var(--text-muted)'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — IconButton
 * Icon-only control. Circle shape (e.g. the gray "+" add button, avatar-sized
 * actions) or square shape (toolbar actions like download / save / delete).
 */
function IconButton({
  icon,
  shape = 'circle',
  size = 'md',
  variant = 'soft',
  disabled = false,
  label,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 28,
    md: 36,
    lg: 44
  };
  const dim = sizes[size] || sizes.md;
  const variants = {
    soft: {
      background: 'var(--gray-100)',
      color: 'var(--slate-700)',
      border: '1px solid transparent'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--slate-500)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'var(--white)',
      color: 'var(--slate-700)',
      border: '1px solid var(--border-default)'
    },
    primary: {
      background: 'var(--primary)',
      color: 'var(--white)',
      border: '1px solid var(--primary)'
    },
    danger: {
      background: 'transparent',
      color: 'var(--danger)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.soft;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    className: "fs-icon-button",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      fontSize: Math.round(dim * 0.5),
      borderRadius: shape === 'circle' ? 'var(--radius-circle)' : 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'var(--transition-base)',
      ...v,
      ...style
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Input
 * Labelled text field. White surface, soft border, focus ring in brand blue.
 * Supports an optional unit suffix (e.g. "g"), a leading icon, hint and error.
 */
function Input({
  label,
  value,
  defaultValue,
  placeholder,
  type = 'text',
  suffix,
  iconLeft,
  hint,
  error,
  disabled = false,
  required = false,
  size = 'md',
  onChange,
  style = {},
  id,
  ...rest
}) {
  const heights = {
    sm: 34,
    md: 44,
    lg: 52
  };
  const h = heights[size] || heights.md;
  const fieldId = id || (label ? `fs-input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : 'var(--border-input)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      font: 'var(--font-label)',
      color: 'var(--slate-700)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--danger)',
      marginLeft: 3
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "fs-input",
    "data-disabled": disabled || undefined,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: h,
      padding: '0 14px',
      background: disabled ? 'var(--gray-100)' : 'var(--white)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      transition: 'var(--transition-base)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-400)',
      fontSize: 18,
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--slate-800)'
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-400)',
      font: 'var(--font-body)',
      fontSize: 'var(--text-base)'
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-caption)',
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Radio
 * Single-choice control with brand-blue ring + filled dot when selected.
 * Use `name` to group several radios.
 */
function Radio({
  checked,
  defaultChecked,
  name,
  value,
  label,
  hint,
  disabled = false,
  onChange,
  id,
  style = {},
  ...rest
}) {
  const fieldId = id || React.useId();
  const on = checked;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'inline-flex',
      alignItems: hint ? 'flex-start' : 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      flex: 'none',
      width: 22,
      height: 22,
      marginTop: hint ? 1 : 0,
      borderRadius: '50%',
      background: 'var(--white)',
      border: `2px solid ${on ? 'var(--primary)' : 'var(--slate-300)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--primary)',
      transform: on ? 'scale(1)' : 'scale(0)',
      transition: 'transform var(--duration-fast) var(--ease-out)'
    }
  })), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--slate-700)'
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-caption)',
      color: 'var(--text-muted)'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Select
 * Styled dropdown. Uses a native <select> for behavior, dressed to match the
 * brand field styling (soft border, brand-blue chevron). "Select One" is the
 * product's conventional empty-state placeholder.
 */
function Select({
  label,
  value,
  defaultValue,
  options = [],
  placeholder = 'Select One',
  disabled = false,
  required = false,
  size = 'md',
  error,
  onChange,
  style = {},
  id,
  ...rest
}) {
  const heights = {
    sm: 34,
    md: 44,
    lg: 52
  };
  const h = heights[size] || heights.md;
  const fieldId = id || (label ? `fs-select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const normalized = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const isEmpty = (value ?? defaultValue ?? '') === '';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      font: 'var(--font-label)',
      color: 'var(--slate-700)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--danger)',
      marginLeft: 3
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "fs-select",
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: h,
      background: disabled ? 'var(--gray-100)' : 'var(--white)',
      border: `1px solid ${error ? 'var(--danger)' : 'var(--border-input)'}`,
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      flex: 1,
      height: '100%',
      padding: '0 38px 0 14px',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: isEmpty ? 'var(--text-placeholder)' : 'var(--slate-800)',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest), /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: true
  }, placeholder), normalized.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value,
    style: {
      color: 'var(--slate-800)'
    }
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: "iconify",
    "data-icon": "icon-park-outline:down",
    style: {
      position: 'absolute',
      right: 12,
      color: 'var(--slate-400)',
      fontSize: 18,
      pointerEvents: 'none'
    }
  })), error && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-caption)',
      color: 'var(--danger)'
    }
  }, error));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Toggle (switch)
 * Pill switch; brand-blue track when on. Used for binary options like
 * "Different canadian label".
 */
function Toggle({
  checked,
  defaultChecked,
  label,
  labelPosition = 'left',
  disabled = false,
  size = 'md',
  onChange,
  id,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const fieldId = id || React.useId();
  const dims = size === 'sm' ? {
    w: 36,
    h: 20,
    knob: 14
  } : {
    w: 46,
    h: 26,
    knob: 20
  };
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };
  const sw = /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'relative',
      flex: 'none',
      width: dims.w,
      height: dims.h,
      borderRadius: 'var(--radius-pill)',
      background: on ? 'var(--primary)' : 'var(--slate-200)',
      transition: 'var(--transition-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: (dims.h - dims.knob) / 2,
      left: on ? dims.w - dims.knob - (dims.h - dims.knob) / 2 : (dims.h - dims.knob) / 2,
      width: dims.knob,
      height: dims.knob,
      borderRadius: '50%',
      background: 'var(--white)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
      transition: 'left var(--duration-base) var(--ease-out)'
    }
  }));
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      flexDirection: labelPosition === 'right' ? 'row' : 'row-reverse',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: "checkbox",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-label)',
      color: 'var(--slate-700)'
    }
  }, label), sw);
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — Tabs
 * Two looks:
 *  • "underline" — section tabs (e.g. modal left-nav alternative / page tabs)
 *  • "pill"      — segmented pills used for recipe versions (V1 / Testing / Final)
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  variant = 'underline',
  onChange,
  style = {},
  ...rest
}) {
  const norm = items.map(it => typeof it === 'string' ? {
    value: it,
    label: it
  } : it);
  const [internal, setInternal] = React.useState(defaultValue ?? norm[0]?.value);
  const active = value !== undefined ? value : internal;
  const pick = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  if (variant === 'pill') {
    return /*#__PURE__*/React.createElement("div", _extends({
      role: "tablist",
      style: {
        display: 'inline-flex',
        gap: 8,
        ...style
      }
    }, rest), norm.map(it => {
      const on = it.value === active;
      return /*#__PURE__*/React.createElement("button", {
        key: it.value,
        role: "tab",
        "aria-selected": on,
        onClick: () => pick(it.value),
        style: {
          height: 34,
          padding: '0 18px',
          borderRadius: 'var(--radius-pill)',
          border: `1px solid ${on ? 'var(--primary)' : 'var(--border-default)'}`,
          background: on ? 'var(--primary)' : 'var(--white)',
          color: on ? 'var(--white)' : 'var(--slate-600)',
          font: 'var(--font-label)',
          fontWeight: 'var(--weight-semibold)',
          cursor: 'pointer',
          transition: 'var(--transition-base)'
        }
      }, it.label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: 28,
      borderBottom: '1px solid var(--border-default)',
      ...style
    }
  }, rest), norm.map(it => {
    const on = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(it.value),
      style: {
        position: 'relative',
        padding: '0 0 12px',
        border: 'none',
        background: 'transparent',
        color: on ? 'var(--slate-800)' : 'var(--slate-400)',
        font: 'var(--font-body-medium)',
        fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        cursor: 'pointer',
        transition: 'var(--transition-base)'
      }
    }, it.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 3,
        borderRadius: '3px 3px 0 0',
        background: on ? 'var(--primary)' : 'transparent',
        transition: 'var(--transition-base)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Flavor Studio — TopNav
 * The product's dark slate top navigation: lime hexagon brand mark on the left,
 * uppercase wide-tracked nav items, optional search + help + avatar on the right.
 */
function TopNav({
  items = [],
  active,
  logoSrc,
  onNavigate,
  right,
  style = {},
  ...rest
}) {
  const norm = items.map(it => typeof it === 'string' ? {
    value: it,
    label: it
  } : it);
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: "fs-topnav",
    style: {
      display: 'flex',
      alignItems: 'center',
      height: 'var(--nav-height)',
      padding: '0 var(--page-gutter)',
      background: 'var(--surface-nav)',
      gap: 36,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flex: 'none'
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Flavor Studio",
    style: {
      height: 32,
      width: 'auto'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 32,
      borderRadius: 6,
      background: 'var(--lime-500)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 36,
      flex: 1
    }
  }, norm.map(it => {
    const on = it.value === active || it.label === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value || it.label,
      onClick: () => onNavigate && onNavigate(it.value || it.label),
      style: {
        border: 'none',
        background: 'transparent',
        padding: 0,
        font: 'var(--font-body-medium)',
        fontSize: 'var(--text-base)',
        fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        color: on ? 'var(--white)' : 'rgba(255,255,255,0.62)',
        cursor: 'pointer',
        transition: 'var(--transition-base)'
      }
    }, it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      flex: 'none'
    }
  }, right));
}
Object.assign(__ds_scope, { TopNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recipe-studio/App.jsx
try { (() => {
/* App — interactive Recipe Studio shell composing the kit + bundle components. */

function App() {
  const {
    TopNav,
    Tabs,
    Avatar,
    IconButton
  } = window.FlavorStudioDesignSystem_8503a2;
  const {
    IngredientTable,
    YieldCostPanel,
    NewIngredientModal
  } = window;
  const [modal, setModal] = React.useState(false);
  const [version, setVersion] = React.useState('Final');
  const [rows, setRows] = React.useState([{
    id: 1,
    name: 'Chocolate',
    step: 'A',
    pct: '20.49%',
    qty: '25.00',
    unit: 'g',
    code: '',
    cost: '0.00'
  }, {
    id: 2,
    name: 'Butter',
    step: 'A',
    pct: '61.48%',
    qty: '75.00',
    unit: 'g',
    code: '',
    cost: '0.00'
  }, {
    id: 3,
    name: 'SubLevel Name (Final)',
    step: 'A',
    pct: '18.03%',
    qty: '22.00',
    unit: 'g',
    code: '',
    cost: '0.00',
    sub: true
  }, {
    id: 4,
    name: 'SubLevel Name 2',
    step: 'A',
    pct: '18.03%',
    qty: '22.00',
    unit: 'g',
    code: 'ITM-2231',
    cost: '0.00',
    sub: true
  }]);
  const Icon = ({
    i,
    c,
    s
  }) => /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": i,
    style: {
      color: c,
      fontSize: s
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--surface-canvas)'
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    logoSrc: "../../assets/logo-mark.png",
    items: ['Projects', 'Inspire', 'Recipes', 'Taste Tests', 'CRM', 'Admin'],
    active: "Recipes",
    onNavigate: v => {
      if (v === 'Recipes') window.location.href = 'recipes.html';
    },
    right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:search",
      c: "rgba(255,255,255,0.7)",
      s: 20
    }), /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:help",
      c: "rgba(255,255,255,0.7)",
      s: 20
    }), /*#__PURE__*/React.createElement(Avatar, {
      name: "Marcus Webb",
      src: "../../assets/avatar-sample.png",
      size: 32
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      boxShadow: 'var(--shadow-inset-top)',
      padding: '18px var(--page-gutter)',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      flex: 1,
      font: 'var(--font-page-title)',
      color: 'var(--slate-700)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "recipes.html",
    style: {
      color: 'var(--slate-300)',
      textDecoration: 'none',
      fontWeight: 400
    }
  }, "Recipes"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-200)',
      fontWeight: 400,
      margin: '0 10px'
    }
  }, "/"), "X12011 Chocolate Frosting"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      border: 'none',
      background: 'transparent',
      color: 'var(--slate-600)',
      font: 'var(--font-body-medium)',
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    i: "icon-park-outline:share-two",
    c: "var(--slate-500)",
    s: 20
  }), "Share"), /*#__PURE__*/React.createElement(Avatar, {
    name: "Marcus Webb",
    src: "../../assets/avatar-sample.png",
    size: 36,
    ring: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      padding: '28px var(--page-gutter) 60px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#fff',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      border: '1px solid var(--border-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--font-label)',
      fontWeight: 700,
      color: 'var(--slate-600)'
    }
  }, "V1"), /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: ['Testing', 'Final'],
    value: version,
    onChange: setVersion
  }), /*#__PURE__*/React.createElement(IconButton, {
    shape: "circle",
    variant: "soft",
    label: "Add version",
    icon: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:plus"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    shape: "square",
    variant: "ghost",
    label: "Download",
    icon: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:download"
    })
  }), /*#__PURE__*/React.createElement(IconButton, {
    shape: "square",
    variant: "ghost",
    label: "Save",
    icon: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:save"
    })
  }), /*#__PURE__*/React.createElement(IconButton, {
    shape: "square",
    variant: "ghost",
    label: "Duplicate",
    icon: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:doc-add"
    })
  }), /*#__PURE__*/React.createElement(IconButton, {
    shape: "square",
    variant: "ghost",
    label: "More",
    icon: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:more-one"
    })
  })), /*#__PURE__*/React.createElement(IngredientTable, {
    rows: rows,
    onAdd: () => setModal(true),
    onDelete: id => setRows(rs => rs.filter(r => r.id !== id))
  })), /*#__PURE__*/React.createElement(YieldCostPanel, null)), /*#__PURE__*/React.createElement(NewIngredientModal, {
    open: modal,
    onClose: () => setModal(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recipe-studio/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recipe-studio/IngredientTable.jsx
try { (() => {
/* IngredientTable — the core recipe formulation grid.
   Uses brand tokens directly; rows reveal actions on hover. */

function NutritionGlyph() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 5,
      border: '1.5px solid var(--blue-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--blue-500)',
      fontSize: 12,
      fontWeight: 700,
      background: 'var(--blue-050)'
    }
  }, "N");
}
function IngredientRow({
  row,
  onDelete
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '2.4fr 0.7fr 0.9fr 0.8fr 0.7fr 1fr 0.8fr auto',
      alignItems: 'center',
      gap: 12,
      padding: '0 18px',
      height: 60,
      borderTop: '1px solid var(--gray-200)',
      background: hover ? 'var(--blue-050)' : 'transparent',
      font: 'var(--font-body)',
      color: 'var(--slate-700)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, row.sub ? /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:down",
    style: {
      color: 'var(--slate-400)',
      fontSize: 18
    }
  }) : /*#__PURE__*/React.createElement(NutritionGlyph, null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-medium)',
      color: 'var(--slate-800)'
    }
  }, row.name)), /*#__PURE__*/React.createElement("div", null, row.step), /*#__PURE__*/React.createElement("div", null, row.pct), /*#__PURE__*/React.createElement("div", null, row.qty), /*#__PURE__*/React.createElement("div", null, row.unit), /*#__PURE__*/React.createElement("div", {
    style: {
      color: row.code ? 'var(--slate-700)' : 'var(--slate-300)'
    }
  }, row.code || 'Item code'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, "$", row.cost), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      opacity: hover ? 1 : 0,
      transition: 'opacity var(--duration-fast)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: pillBtn
  }, "View Nutrition"), /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:link-two",
    style: actIcon
  }), /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:lock",
    style: actIcon
  }), /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:delete",
    style: {
      ...actIcon,
      color: 'var(--slate-400)'
    },
    onClick: () => onDelete && onDelete(row.id)
  })));
}
const pillBtn = {
  height: 28,
  padding: '0 14px',
  borderRadius: 'var(--radius-pill)',
  border: '1px solid var(--blue-300)',
  background: '#fff',
  color: 'var(--blue-600)',
  font: 'var(--font-label)',
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};
const actIcon = {
  fontSize: 19,
  color: 'var(--slate-500)',
  cursor: 'pointer'
};
function IngredientTable({
  rows,
  onAdd,
  onDelete
}) {
  const headCols = ['INGREDIENT', 'STEP', '100.00%', 'QTY', 'Unit', 'ITEM CODE', '$', ''];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2.4fr 0.7fr 0.9fr 0.8fr 0.7fr 1fr 0.8fr auto',
      gap: 12,
      padding: '16px 18px',
      font: 'var(--font-eyebrow)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--slate-400)'
    }
  }, headCols.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textTransform: h.includes('%') ? 'none' : 'uppercase'
    }
  }, h))), rows.map(r => /*#__PURE__*/React.createElement(IngredientRow, {
    key: r.id,
    row: r,
    onDelete: onDelete
  })), /*#__PURE__*/React.createElement("div", {
    onClick: onAdd,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      height: 64,
      padding: '0 18px',
      borderTop: '1px solid var(--gray-200)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--gray-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--slate-700)',
      fontSize: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:plus"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-body-medium)',
      fontWeight: 600,
      color: 'var(--slate-700)'
    }
  }, "Add Ingredient")));
}
window.IngredientTable = IngredientTable;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recipe-studio/IngredientTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recipe-studio/NewIngredientModal.jsx
try { (() => {
/* NewIngredientModal — the "New Ingredient" form modal.
   Left section nav + Basic Information fields. Uses bundle components. */

function NewIngredientModal({
  open,
  onClose
}) {
  const {
    Dialog,
    Button,
    Input,
    Select,
    Toggle,
    Checkbox
  } = window.FlavorStudioDesignSystem_8503a2;
  const sections = ['Basic Information', 'Nutrients / Allergens', 'Ingredient Statement', 'Certifications & Documents', 'Procurement', 'Validation'];
  const [active, setActive] = React.useState(sections[0]);
  const [caLabel, setCaLabel] = React.useState(true);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(Dialog, {
    title: "New Ingredient",
    width: 1040,
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      disabled: true
    }, "Save"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '236px 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, sections.map(s => {
    const on = s === active;
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => setActive(s),
      style: {
        textAlign: 'left',
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        borderLeft: `3px solid ${on ? 'var(--primary)' : 'transparent'}`,
        background: on ? 'var(--blue-050)' : 'transparent',
        font: 'var(--font-body-medium)',
        fontWeight: on ? 700 : 500,
        color: on ? 'var(--slate-800)' : 'var(--slate-500)',
        cursor: 'pointer'
      }
    }, s);
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--font-section-title)',
      fontSize: 'var(--text-xl)',
      color: 'var(--slate-700)',
      marginBottom: 20
    }
  }, "Basic Information"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "e.g. Dark Chocolate 70%"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Item Code",
    placeholder: "ITM-00421"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Category",
    options: ['Dairy', 'Sweetener', 'Flavoring', 'Acid', 'Stabilizer']
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Weight",
    defaultValue: "100",
    suffix: "g"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      font: 'var(--font-label)',
      color: 'var(--slate-700)'
    }
  }, "Ingredient statement"), /*#__PURE__*/React.createElement(Toggle, {
    label: "Different canadian label",
    checked: caLabel,
    onChange: setCaLabel
  })), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Sugar, cocoa butter, cocoa mass, soy lecithin\u2026"
  }), caLabel && /*#__PURE__*/React.createElement(Input, {
    label: "Ingredient statement (CA)",
    placeholder: "Sucre, beurre de cacao, p\xE2te de cacao\u2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Density",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Processing aid"
  }))))));
}
window.NewIngredientModal = NewIngredientModal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recipe-studio/NewIngredientModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recipe-studio/RecipesList.jsx
try { (() => {
/* RecipesList — the recipe library you land on before opening a Recipe View.
   Composes design-system primitives: TopNav, Tabs, Input, Button, IconButton,
   Tag, Badge, Avatar. Rows are clickable and navigate to the Recipe View. */

const RECIPES = [{
  code: 'X12011',
  name: 'Chocolate Frosting',
  cat: 'Bakery',
  catColor: 'var(--amber-500)',
  status: 'Final',
  versions: 3,
  cost: '0.38',
  owner: 'Marcus Webb',
  avatar: '../../assets/avatar-sample.png',
  updated: 'Jun 3, 2026'
}, {
  code: '10029',
  name: 'WIP Buttercream French',
  cat: 'Bakery',
  catColor: 'var(--amber-500)',
  status: 'Testing',
  versions: 2,
  cost: '0.52',
  owner: 'Jia Park',
  updated: 'Jun 2, 2026'
}, {
  code: '10027',
  name: 'Simple Syrup Plain',
  cat: 'Sweetener',
  catColor: 'var(--teal-500)',
  status: 'Final',
  versions: 1,
  cost: '0.06',
  owner: 'Dana Liu',
  updated: 'May 27, 2026'
}, {
  code: 'X12044',
  name: 'Vanilla Bean Custard',
  cat: 'Dairy',
  catColor: 'var(--blue-500)',
  status: 'Testing',
  versions: 4,
  cost: '0.71',
  owner: 'Sam Ortiz',
  updated: 'May 24, 2026'
}, {
  code: '10031',
  name: 'Raspberry Coulis',
  cat: 'Fruit',
  catColor: 'var(--red-500)',
  status: 'Final',
  versions: 2,
  cost: '0.44',
  owner: 'Jia Park',
  updated: 'May 22, 2026'
}, {
  code: 'X12090',
  name: 'Brown Butter Base',
  cat: 'Dairy',
  catColor: 'var(--blue-500)',
  status: 'Draft',
  versions: 1,
  cost: '0.33',
  owner: 'Marcus Webb',
  avatar: '../../assets/avatar-sample.png',
  updated: 'May 19, 2026'
}, {
  code: '10052',
  name: 'Toasted Almond Praline',
  cat: 'Nuts',
  catColor: 'var(--violet-500)',
  status: 'Testing',
  versions: 3,
  cost: '0.89',
  owner: 'Dana Liu',
  updated: 'May 15, 2026'
}, {
  code: 'X12112',
  name: 'Sea Salt Caramel',
  cat: 'Confection',
  catColor: 'var(--amber-500)',
  status: 'Final',
  versions: 5,
  cost: '0.61',
  owner: 'Sam Ortiz',
  updated: 'May 11, 2026'
}];
const STATUS_TONE = {
  Final: 'green',
  Testing: 'amber',
  Draft: 'neutral'
};
function RecipeRow({
  r,
  onOpen
}) {
  const {
    Tag,
    Badge,
    Avatar
  } = window.FlavorStudioDesignSystem_8503a2;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen(r),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '2.6fr 1.1fr 1fr 0.8fr 0.9fr 1.4fr auto',
      alignItems: 'center',
      gap: 16,
      padding: '0 22px',
      height: 64,
      borderTop: '1px solid var(--gray-200)',
      background: hover ? 'var(--blue-050)' : 'transparent',
      cursor: 'pointer',
      transition: 'background var(--duration-fast)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-md)',
      flex: 'none',
      background: 'var(--blue-050)',
      border: '1px solid var(--blue-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--blue-500)',
      fontSize: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:chef-hat-one"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-body-medium)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--slate-800)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-caption)',
      color: 'var(--slate-300)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, r.code))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tag, {
    color: r.catColor
  }, r.cat)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: STATUS_TONE[r.status],
    variant: r.status === 'Final' ? 'solid' : 'soft'
  }, r.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--font-body)',
      color: 'var(--slate-500)'
    }
  }, r.versions, " ver"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--font-body-medium)',
      fontWeight: 600,
      color: 'var(--slate-700)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, "$", r.cost, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-300)',
      fontWeight: 400
    }
  }, " /unit")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: r.owner,
    src: r.avatar,
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-caption)',
      color: 'var(--slate-500)'
    }
  }, r.updated)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      color: 'var(--slate-300)',
      fontSize: 20,
      opacity: hover ? 1 : 0,
      transition: 'opacity var(--duration-fast)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:right"
  })));
}
function RecipesList() {
  const NS = window.FlavorStudioDesignSystem_8503a2;
  const {
    TopNav,
    Tabs,
    Input,
    Button,
    IconButton,
    Avatar,
    Badge
  } = NS;
  const [filter, setFilter] = React.useState('All');
  const [query, setQuery] = React.useState('');
  const Icon = ({
    i,
    c,
    s
  }) => /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": i,
    style: {
      color: c,
      fontSize: s
    }
  });
  const open = () => {
    window.location.href = 'index.html';
  };
  const rows = RECIPES.filter(r => (filter === 'All' || r.status === filter) && (query === '' || (r.name + ' ' + r.code).toLowerCase().includes(query.toLowerCase())));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--surface-canvas)'
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    logoSrc: "../../assets/logo-mark.png",
    items: ['Projects', 'Inspire', 'Recipes', 'Taste Tests', 'CRM', 'Admin'],
    active: "Recipes",
    right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:search",
      c: "rgba(255,255,255,0.7)",
      s: 20
    }), /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:help",
      c: "rgba(255,255,255,0.7)",
      s: 20
    }), /*#__PURE__*/React.createElement(Avatar, {
      name: "Marcus Webb",
      src: "../../assets/avatar-sample.png",
      size: 32
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      boxShadow: 'var(--shadow-inset-top)',
      padding: '24px var(--page-gutter) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--font-page-title)',
      color: 'var(--slate-700)'
    }
  }, "Recipes ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-300)',
      fontWeight: 400
    }
  }, RECIPES.length)), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--font-body)',
      color: 'var(--slate-400)',
      marginTop: 4
    }
  }, "Your organization's formulas \u2014 open one to develop ingredients, nutrition and cost.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:download",
      s: 18
    })
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:plus",
      s: 18
    })
  }, "New Recipe"))), /*#__PURE__*/React.createElement(Tabs, {
    items: ['All', 'Testing', 'Final', 'Draft'],
    value: filter,
    onChange: setFilter
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px var(--page-gutter) 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search recipes or codes\u2026",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:search",
      s: 18
    }),
    value: query,
    onChange: e => setQuery(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    shape: "square",
    variant: "ghost",
    label: "Sort",
    icon: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:sort-two"
    })
  }), /*#__PURE__*/React.createElement(IconButton, {
    shape: "square",
    variant: "ghost",
    label: "Filter",
    icon: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:filter"
    })
  }), /*#__PURE__*/React.createElement(IconButton, {
    shape: "square",
    variant: "outline",
    label: "Grid view",
    icon: /*#__PURE__*/React.createElement(Icon, {
      i: "icon-park-outline:view-grid-list"
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2.6fr 1.1fr 1fr 0.8fr 0.9fr 1.4fr auto',
      gap: 16,
      padding: '15px 22px',
      font: 'var(--font-eyebrow)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--slate-400)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Recipe"), /*#__PURE__*/React.createElement("div", null, "Category"), /*#__PURE__*/React.createElement("div", null, "Status"), /*#__PURE__*/React.createElement("div", null, "Versions"), /*#__PURE__*/React.createElement("div", null, "Cost"), /*#__PURE__*/React.createElement("div", null, "Owner \xB7 Updated"), /*#__PURE__*/React.createElement("div", null)), rows.map(r => /*#__PURE__*/React.createElement(RecipeRow, {
    key: r.code,
    r: r,
    onOpen: open
  })), rows.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px',
      textAlign: 'center',
      color: 'var(--slate-400)',
      font: 'var(--font-body)',
      borderTop: '1px solid var(--gray-200)'
    }
  }, "No recipes match \u201C", query, "\u201D."))));
}
window.RecipesList = RecipesList;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recipe-studio/RecipesList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/recipe-studio/YieldCostPanel.jsx
try { (() => {
/* YieldCostPanel — the right sidebar: blue header, metric rows,
   dark cost rows, and the action list with Icon Park glyphs. */

function MetricRow({
  label,
  value,
  hint
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 18px',
      height: 50,
      borderBottom: '1px solid var(--gray-200)',
      font: 'var(--font-body)',
      color: 'var(--slate-700)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, label, hint && /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:help",
    style: {
      fontSize: 15,
      color: 'var(--slate-300)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 64,
      height: 30,
      padding: '0 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-input)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontWeight: 600,
      color: 'var(--slate-800)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value));
}
function CostRow({
  label,
  value,
  link
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 18px',
      height: 46,
      background: 'var(--slate-700)',
      color: '#fff',
      font: 'var(--font-body-medium)',
      fontWeight: 500,
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, label, link && /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:share-two",
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value));
}
function ActionRow({
  icon,
  label,
  last
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '0 18px',
      height: 64,
      borderBottom: last ? 'none' : '1px solid var(--gray-200)',
      background: hover ? 'var(--blue-050)' : '#fff',
      cursor: 'pointer',
      color: 'var(--slate-400)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": icon,
    style: {
      fontSize: 26,
      color: 'var(--slate-300)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-eyebrow)',
      fontSize: 'var(--text-sm)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--slate-400)',
      fontWeight: 600
    }
  }, label));
}
function YieldCostPanel() {
  const [open, setOpen] = React.useState(true);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--sidebar-width)',
      flex: 'none',
      background: '#fff',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("header", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 18px',
      background: 'var(--blue-500)',
      color: '#fff',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:weight",
    style: {
      fontSize: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--font-section-title)',
      fontSize: 'var(--text-base)',
      fontWeight: 700,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, "Yield / Cost"), /*#__PURE__*/React.createElement("span", {
    className: "iconify",
    "data-icon": "icon-park-outline:up",
    style: {
      fontSize: 22,
      transform: open ? 'none' : 'rotate(180deg)',
      transition: 'var(--transition-base)'
    }
  })), open && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetricRow, {
    label: "Batch size (g)",
    value: "621.98"
  }), /*#__PURE__*/React.createElement(MetricRow, {
    label: "Yield (g)",
    value: "621.98"
  }), /*#__PURE__*/React.createElement(MetricRow, {
    label: "Containers yielded",
    value: "1"
  }), /*#__PURE__*/React.createElement(MetricRow, {
    label: "Servings / Container",
    value: "3"
  }), /*#__PURE__*/React.createElement(MetricRow, {
    label: "Serving weight (g)",
    value: "207.33"
  }), /*#__PURE__*/React.createElement(MetricRow, {
    label: "Serving size",
    value: "1 cup",
    hint: true
  }), /*#__PURE__*/React.createElement(CostRow, {
    label: "Total batch cost",
    value: "$0.38"
  }), /*#__PURE__*/React.createElement(CostRow, {
    label: "Container cost",
    value: "$0.38"
  }), /*#__PURE__*/React.createElement(CostRow, {
    label: "Retail Price",
    value: "$0.76",
    link: true
  }), /*#__PURE__*/React.createElement(ActionRow, {
    icon: "icon-park-outline:doc-detail",
    label: "Label Preview"
  }), /*#__PURE__*/React.createElement(ActionRow, {
    icon: "icon-park-outline:list-checkbox",
    label: "Nutrient Content Claims"
  }), /*#__PURE__*/React.createElement(ActionRow, {
    icon: "icon-park-outline:bowl",
    label: "Procedure"
  }), /*#__PURE__*/React.createElement(ActionRow, {
    icon: "icon-park-outline:vegetables",
    label: "Ingredient Statement"
  }), /*#__PURE__*/React.createElement(ActionRow, {
    icon: "icon-park-outline:picture",
    label: "Images"
  }), /*#__PURE__*/React.createElement(ActionRow, {
    icon: "icon-park-outline:notepad",
    label: "Notes",
    last: true
  })));
}
window.YieldCostPanel = YieldCostPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/recipe-studio/YieldCostPanel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TopNav = __ds_scope.TopNav;

})();
