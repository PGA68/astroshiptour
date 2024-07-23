import type { AllowedButtons, DriveStep, PopoverDOM, State } from "driver.js";

export type Config = {
    // Array of steps to highlight. You should pass
    // this when you want to setup a product tour.
    steps?: DriveStep[];

    // Whether to animate the product tour. (default: true)
    animate?: boolean;
    // Overlay color. (default: black)
    // This is useful when you have a dark background
    // and want to highlight elements with a light
    // background color.
    overlayColor?: string;
    // Whether to smooth scroll to the highlighted element. (default: false)
    smoothScroll?: boolean;
    // Whether to allow closing the popover by clicking on the backdrop. (default: true)
    allowClose?: boolean;
    // Opacity of the backdrop. (default: 0.5)
    overlayOpacity?: number;
    // Distance between the highlighted element and the cutout. (default: 10)
    stagePadding?: number;
    // Radius of the cutout around the highlighted element. (default: 5)
    stageRadius?: number;

    // Whether to allow keyboard navigation. (default: true)
    allowKeyboardControl?: boolean;

    // Whether to disable interaction with the highlighted element. (default: false)
    disableActiveInteraction?: boolean;

    // If you want to add custom class to the popover
    popoverClass?: string;
    // Distance between the popover and the highlighted element. (default: 10)
    popoverOffset?: number;
    // Array of buttons to show in the popover. Defaults to ["next", "previous", "close"]
    // for product tours and [] for single element highlighting.
    showButtons?: AllowedButtons[];
    // Array of buttons to disable. This is useful when you want to show some of the
    // buttons, but disable some of them.
    disableButtons?: AllowedButtons[];

    // Whether to show the progress text in popover. (default: false)
    showProgress?: boolean;
    // Template for the progress text. You can use the following placeholders in the template:
    //  - {{current}}: The current step number
    //  - {{total}}: Total number of steps
    progressText?: string;

    // Text to show in the buttons. `doneBtnText`
    // is used on the last step of a tour.
    nextBtnText?: string;
    prevBtnText?: string;
    doneBtnText?: string;

    // Called after the popover is rendered.
    // PopoverDOM is an object with references to
    // the popover DOM elements such as buttons
    // title, descriptions, body, container etc.
    onPopoverRender?: (popover: PopoverDOM, options: { config: Config; state: State }) => void;

    // Hooks to run before and after highlighting
    // each step. Each hook receives the following
    // parameters:
    //   - element: The target DOM element of the step
    //   - step: The step object configured for the step
    //   - options.config: The current configuration options
    //   - options.state: The current state of the driver
    onHighlightStarted?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
    onHighlighted?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
    onDeselected?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;

    // Hooks to run before and after the driver
    // is destroyed. Each hook receives
    // the following parameters:
    //   - element: Currently active element
    //   - step: The step object configured for the currently active
    //   - options.config: The current configuration options
    //   - options.state: The current state of the driver
    onDestroyStarted?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
    onDestroyed?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;

    // Hooks to run on button clicks. Each hook receives
    // the following parameters:
    //   - element: The current DOM element of the step
    //   - step: The step object configured for the step
    //   - options.config: The current configuration options
    //   - options.state: The current state of the driver
    onNextClick?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
    onPrevClick?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
    onCloseClick?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
};

export type Popover = {
    // Title and descriptions shown in the popover.
    // You can use HTML in these. Also, you can
    // omit one of these to show only the other.
    title?: string;
    description?: string;

    // The position and alignment of the popover
    // relative to the target element.
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";

    // Array of buttons to show in the popover.
    // When highlighting a single element, there
    // are no buttons by default. When showing
    // a tour, the default buttons are "next",
    // "previous" and "close".
    showButtons?: ("next" | "previous" | "close")[];
    // An array of buttons to disable. This is
    // useful when you want to show some of the
    // buttons, but disable some of them.
    disableButtons?: ("next" | "previous" | "close")[];

    // Text to show in the buttons. `doneBtnText`
    // is used on the last step of a tour.
    nextBtnText?: string;
    prevBtnText?: string;
    doneBtnText?: string;

    // Whether to show the progress text in popover.
    showProgress?: boolean;
    // Template for the progress text. You can use
    // the following placeholders in the template:
    //   - {{current}}: The current step number
    //   - {{total}}: Total number of steps
    // Defaults to following if `showProgress` is true:
    //   - "{{current}} of {{total}}"
    progressText?: string;

    // Custom class to add to the popover element.
    // This can be used to style the popover.
    popoverClass?: string;

    // Hook to run after the popover is rendered.
    // You can modify the popover element here.
    // Parameter is an object with references to
    // the popover DOM elements such as buttons
    // title, descriptions, body, etc.
    onPopoverRender?: (popover: PopoverDOM, options: { config: Config; state: State }) => void;

    // Callbacks for button clicks. You can use
    // these to add custom behavior to the buttons.
    // Each callback receives the following parameters:
    //   - element: The current DOM element of the step
    //   - step: The step object configured for the step
    //   - options.config: The current configuration options
    //   - options.state: The current state of the driver
    onNextClick?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
    onPrevClick?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
    onCloseClick?: (element: Element | undefined, step: DriveStep, options: { config: Config; state: State }) => void;
}

export type DriveStepConfig = {
    // The target element to highlight.
    // This can be a DOM element, or a CSS selector.
    // If this is a selector, the first matching
    // element will be highlighted.
    element: Element | string;

    // The popover configuration for this step.
    // Look at the Popover Configuration section
    popover?: Popover;

    // Callback when the current step is deselected,
    // about to be highlighted or highlighted.
    // Each callback receives the following parameters:
    //   - element: The current DOM element of the step
    //   - step: The step object configured for the step
    //   - options.config: The current configuration options
    //   - options.state: The current state of the driver
    onDeselected?: (element: Element | undefined, step: DriveStepConfig, options: { config: Config; state: State }) => void;
    onHighlightStarted?: (element: Element | undefined, step: DriveStepConfig, options: { config: Config; state: State }) => void;
    onHighlighted?: (element: Element | undefined, step: DriveStepConfig, options: { config: Config; state: State }) => void;
}

export type StateConfig = {
    // Whether the driver is currently active or not
    isInitialized?: boolean;

    // Index of the currently active step if using
    // as a product tour and have configured the
    // steps array.
    activeIndex?: number;
    // DOM element of the currently active step
    activeElement?: Element;
    // Step object of the currently active step
    activeStep?: DriveStep;

    // DOM element that was previously active
    previousElement?: Element;
    // Step object of the previously active step
    previousStep?: DriveStep;

    // DOM elements for the popover i.e. including
    // container, title, description, buttons etc.
    popover?: PopoverDOM;
}