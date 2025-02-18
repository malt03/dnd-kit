'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var core = require('@dnd-kit/core');
var utilities = require('@dnd-kit/utilities');

/**
 * Move an array item to a different position. Returns a new array with the item moved to the new position.
 */
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}

/**
 * Swap an array item to a different position. Returns a new array with the item swapped to the new position.
 */
function arraySwap(array, from, to) {
  const newArray = array.slice();
  newArray[from] = array[to];
  newArray[to] = array[from];
  return newArray;
}

function getSortedRects(items, rects) {
  return items.reduce((accumulator, id, index) => {
    const rect = rects.get(id);

    if (rect) {
      accumulator[index] = rect;
    }

    return accumulator;
  }, Array(items.length));
}

function isValidIndex(index) {
  return index !== null && index >= 0;
}

// To-do: We should be calculating scale transformation
const defaultScale = {
  scaleX: 1,
  scaleY: 1
};
const horizontalListSortingStrategy = ({
  rects,
  activeNodeRect: fallbackActiveRect,
  activeIndex,
  overIndex,
  index
}) => {
  var _rects$activeIndex;

  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;

  if (!activeNodeRect) {
    return null;
  }

  const itemGap = getItemGap(rects, index, activeIndex);

  if (index === activeIndex) {
    const newIndexRect = rects[overIndex];

    if (!newIndexRect) {
      return null;
    }

    return {
      x: activeIndex < overIndex ? newIndexRect.left + newIndexRect.width - (activeNodeRect.left + activeNodeRect.width) : newIndexRect.left - activeNodeRect.left,
      y: 0,
      ...defaultScale
    };
  }

  if (index > activeIndex && index <= overIndex) {
    return {
      x: -activeNodeRect.width - itemGap,
      y: 0,
      ...defaultScale
    };
  }

  if (index < activeIndex && index >= overIndex) {
    return {
      x: activeNodeRect.width + itemGap,
      y: 0,
      ...defaultScale
    };
  }

  return {
    x: 0,
    y: 0,
    ...defaultScale
  };
};

function getItemGap(rects, index, activeIndex) {
  const currentRect = rects[index];
  const previousRect = rects[index - 1];
  const nextRect = rects[index + 1];

  if (!currentRect || !previousRect && !nextRect) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect ? currentRect.left - (previousRect.left + previousRect.width) : nextRect.left - (currentRect.left + currentRect.width);
  }

  return nextRect ? nextRect.left - (currentRect.left + currentRect.width) : currentRect.left - (previousRect.left + previousRect.width);
}

const rectSortingStrategy = ({
  rects,
  activeIndex,
  overIndex,
  index
}) => {
  const newRects = arrayMove(rects, overIndex, activeIndex);
  const oldRect = rects[index];
  const newRect = newRects[index];

  if (!newRect || !oldRect) {
    return null;
  }

  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};

const rectSwappingStrategy = ({
  activeIndex,
  index,
  rects,
  overIndex
}) => {
  let oldRect;
  let newRect;

  if (index === activeIndex) {
    oldRect = rects[index];
    newRect = rects[overIndex];
  }

  if (index === overIndex) {
    oldRect = rects[index];
    newRect = rects[activeIndex];
  }

  if (!newRect || !oldRect) {
    return null;
  }

  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};

// To-do: We should be calculating scale transformation
const defaultScale$1 = {
  scaleX: 1,
  scaleY: 1
};
const verticalListSortingStrategy = ({
  activeIndex,
  activeNodeRect: fallbackActiveRect,
  index,
  rects,
  overIndex
}) => {
  var _rects$activeIndex;

  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;

  if (!activeNodeRect) {
    return null;
  }

  if (index === activeIndex) {
    const overIndexRect = rects[overIndex];

    if (!overIndexRect) {
      return null;
    }

    return {
      x: 0,
      y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
      ...defaultScale$1
    };
  }

  const itemGap = getItemGap$1(rects, index, activeIndex);

  if (index > activeIndex && index <= overIndex) {
    return {
      x: 0,
      y: -activeNodeRect.height - itemGap,
      ...defaultScale$1
    };
  }

  if (index < activeIndex && index >= overIndex) {
    return {
      x: 0,
      y: activeNodeRect.height + itemGap,
      ...defaultScale$1
    };
  }

  return {
    x: 0,
    y: 0,
    ...defaultScale$1
  };
};

function getItemGap$1(clientRects, index, activeIndex) {
  const currentRect = clientRects[index];
  const previousRect = clientRects[index - 1];
  const nextRect = clientRects[index + 1];

  if (!currentRect) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
  }

  return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
}

const ID_PREFIX = 'Sortable';
const Context = /*#__PURE__*/React__default.createContext({
  activeIndex: -1,
  containerId: ID_PREFIX,
  disableTransforms: false,
  items: [],
  overIndex: -1,
  useDragOverlay: false,
  sortedRects: [],
  strategy: rectSortingStrategy
});
function SortableContext({
  children,
  id,
  items: userDefinedItems,
  strategy = rectSortingStrategy
}) {
  const {
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers,
    measuringScheduled
  } = core.useDndContext();
  const containerId = utilities.useUniqueId(ID_PREFIX, id);
  const useDragOverlay = Boolean(dragOverlay.rect !== null);
  const items = React.useMemo(() => userDefinedItems.map(item => typeof item === 'string' ? item : item.id), [userDefinedItems]);
  const activeIndex = active ? items.indexOf(active.id) : -1;
  const overIndex = over ? items.indexOf(over.id) : -1;
  const previousItemsRef = React.useRef(items);
  const itemsHaveChanged = !isEqual(items, previousItemsRef.current);
  const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
  utilities.useIsomorphicLayoutEffect(() => {
    if (itemsHaveChanged && !measuringScheduled) {
      measureDroppableContainers(items);
    }
  }, [itemsHaveChanged, items, measureDroppableContainers, measuringScheduled]);
  React.useEffect(() => {
    previousItemsRef.current = items;
  }, [items]);
  const contextValue = React.useMemo(() => ({
    activeIndex,
    containerId,
    disableTransforms,
    items,
    overIndex,
    useDragOverlay,
    sortedRects: getSortedRects(items, droppableRects),
    strategy
  }), [activeIndex, containerId, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]);
  return React__default.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

function isEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

const defaultNewIndexGetter = ({
  id,
  items,
  activeIndex,
  overIndex
}) => arrayMove(items, activeIndex, overIndex).indexOf(id);
const defaultAnimateLayoutChanges = ({
  containerId,
  isSorting,
  wasDragging,
  index,
  items,
  newIndex,
  previousItems,
  previousContainerId,
  transition
}) => {
  if (!transition || !wasDragging) {
    return false;
  }

  if (previousItems !== items && index === newIndex) {
    return false;
  }

  if (isSorting) {
    return true;
  }

  return newIndex !== index && containerId === previousContainerId;
};
const defaultTransition = {
  duration: 200,
  easing: 'ease'
};
const transitionProperty = 'transform';
const disabledTransition = /*#__PURE__*/utilities.CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: 'linear'
});
const defaultAttributes = {
  roleDescription: 'sortable'
};

/*
 * When the index of an item changes while sorting,
 * we need to temporarily disable the transforms
 */

function useDerivedTransform({
  disabled,
  index,
  node,
  rect
}) {
  const [derivedTransform, setDerivedtransform] = React.useState(null);
  const previousIndex = React.useRef(index);
  utilities.useIsomorphicLayoutEffect(() => {
    if (!disabled && index !== previousIndex.current && node.current) {
      const initial = rect.current;

      if (initial) {
        const current = core.getClientRect(node.current, {
          ignoreTransform: true
        });
        const delta = {
          x: initial.left - current.left,
          y: initial.top - current.top,
          scaleX: initial.width / current.width,
          scaleY: initial.height / current.height
        };

        if (delta.x || delta.y) {
          setDerivedtransform(delta);
        }
      }
    }

    if (index !== previousIndex.current) {
      previousIndex.current = index;
    }
  }, [disabled, index, node, rect]);
  React.useEffect(() => {
    if (derivedTransform) {
      requestAnimationFrame(() => {
        setDerivedtransform(null);
      });
    }
  }, [derivedTransform]);
  return derivedTransform;
}

function useSortable({
  animateLayoutChanges = defaultAnimateLayoutChanges,
  attributes: userDefinedAttributes,
  disabled,
  data: customData,
  getNewIndex = defaultNewIndexGetter,
  id,
  strategy: localStrategy,
  resizeObserverConfig,
  transition = defaultTransition
}) {
  const {
    items,
    containerId,
    activeIndex,
    disableTransforms,
    sortedRects,
    overIndex,
    useDragOverlay,
    strategy: globalStrategy
  } = React.useContext(Context);
  const index = items.indexOf(id);
  const data = React.useMemo(() => ({
    sortable: {
      containerId,
      index,
      items
    },
    ...customData
  }), [containerId, customData, index, items]);
  const itemsAfterCurrentSortable = React.useMemo(() => items.slice(items.indexOf(id)), [items, id]);
  const {
    rect,
    node,
    isOver,
    setNodeRef: setDroppableNodeRef
  } = core.useDroppable({
    id,
    data,
    resizeObserverConfig: {
      updateMeasurementsFor: itemsAfterCurrentSortable,
      ...resizeObserverConfig
    }
  });
  const {
    active,
    activatorEvent,
    activeNodeRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    transform
  } = core.useDraggable({
    id,
    data,
    attributes: { ...defaultAttributes,
      ...userDefinedAttributes
    },
    disabled
  });
  const setNodeRef = utilities.useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);
  const isSorting = Boolean(active);
  const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
  const shouldDisplaceDragSource = !useDragOverlay && isDragging;
  const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
  const strategy = localStrategy != null ? localStrategy : globalStrategy;
  const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
    rects: sortedRects,
    activeNodeRect,
    activeIndex,
    overIndex,
    index
  }) : null;
  const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
    id,
    items,
    activeIndex,
    overIndex
  }) : index;
  const activeId = active == null ? void 0 : active.id;
  const previous = React.useRef({
    activeId,
    items,
    newIndex,
    containerId
  });
  const itemsHaveChanged = items !== previous.current.items;
  const shouldAnimateLayoutChanges = animateLayoutChanges({
    active,
    containerId,
    isDragging,
    isSorting,
    id,
    index,
    items,
    newIndex: previous.current.newIndex,
    previousItems: previous.current.items,
    previousContainerId: previous.current.containerId,
    transition,
    wasDragging: previous.current.activeId != null
  });
  const derivedTransform = useDerivedTransform({
    disabled: !shouldAnimateLayoutChanges,
    index,
    node,
    rect
  });
  React.useEffect(() => {
    if (isSorting && previous.current.newIndex !== newIndex) {
      previous.current.newIndex = newIndex;
    }

    if (containerId !== previous.current.containerId) {
      previous.current.containerId = containerId;
    }

    if (items !== previous.current.items) {
      previous.current.items = items;
    }

    if (activeId !== previous.current.activeId) {
      previous.current.activeId = activeId;
    }
  }, [activeId, isSorting, newIndex, containerId, items]);
  return {
    active,
    activeIndex,
    attributes,
    rect,
    index,
    newIndex,
    items,
    isOver,
    isSorting,
    isDragging,
    listeners,
    node,
    overIndex,
    over,
    setNodeRef,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform: derivedTransform != null ? derivedTransform : finalTransform,
    transition: getTransition()
  };

  function getTransition() {
    if ( // Temporarily disable transitions for a single frame to set up derived transforms
    derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
    itemsHaveChanged && previous.current.newIndex === index) {
      return disabledTransition;
    }

    if (shouldDisplaceDragSource && !utilities.isKeyboardEvent(activatorEvent) || !transition) {
      return undefined;
    }

    if (isSorting || shouldAnimateLayoutChanges) {
      return utilities.CSS.Transition.toString({ ...transition,
        property: transitionProperty
      });
    }

    return undefined;
  }
}

const directions = [core.KeyboardCode.Down, core.KeyboardCode.Right, core.KeyboardCode.Up, core.KeyboardCode.Left];
const sortableKeyboardCoordinates = (event, {
  context: {
    active,
    collisionRect,
    droppableRects,
    droppableContainers,
    over,
    scrollableAncestors
  }
}) => {
  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) {
      return;
    }

    const filteredContainers = [];
    droppableContainers.getEnabled().forEach(entry => {
      if (!entry || (entry == null ? void 0 : entry.disabled)) {
        return;
      }

      const rect = entry == null ? void 0 : entry.rect.current;

      if (!rect) {
        return;
      }

      switch (event.code) {
        case core.KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            filteredContainers.push(entry);
          }

          break;

        case core.KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            filteredContainers.push(entry);
          }

          break;

        case core.KeyboardCode.Left:
          if (collisionRect.left > rect.left) {
            filteredContainers.push(entry);
          }

          break;

        case core.KeyboardCode.Right:
          if (collisionRect.left < rect.left) {
            filteredContainers.push(entry);
          }

          break;
      }
    });
    const collisions = core.closestCorners({
      active,
      collisionRect: collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null
    });
    let closestId = core.getFirstCollision(collisions, 'id');

    if (closestId === (over == null ? void 0 : over.id) && collisions.length > 1) {
      closestId = collisions[1].id;
    }

    if (closestId != null) {
      const newDroppable = droppableContainers.get(closestId);
      const newNode = newDroppable == null ? void 0 : newDroppable.node.current;
      const newRect = newDroppable == null ? void 0 : newDroppable.rect.current;

      if (newNode && newRect) {
        const newScrollAncestors = core.getScrollableAncestors(newNode);
        const hasDifferentScrollAncestors = newScrollAncestors.some((element, index) => scrollableAncestors[index] !== element);
        const offset = hasDifferentScrollAncestors ? {
          x: 0,
          y: 0
        } : {
          x: collisionRect.width - newRect.width,
          y: collisionRect.height - newRect.height
        };
        const newCoordinates = {
          x: newRect.left - offset.x,
          y: newRect.top - offset.y
        };
        return newCoordinates;
      }
    }
  }

  return undefined;
};

exports.SortableContext = SortableContext;
exports.arrayMove = arrayMove;
exports.arraySwap = arraySwap;
exports.defaultAnimateLayoutChanges = defaultAnimateLayoutChanges;
exports.defaultNewIndexGetter = defaultNewIndexGetter;
exports.horizontalListSortingStrategy = horizontalListSortingStrategy;
exports.rectSortingStrategy = rectSortingStrategy;
exports.rectSwappingStrategy = rectSwappingStrategy;
exports.sortableKeyboardCoordinates = sortableKeyboardCoordinates;
exports.useSortable = useSortable;
exports.verticalListSortingStrategy = verticalListSortingStrategy;
//# sourceMappingURL=sortable.cjs.development.js.map
