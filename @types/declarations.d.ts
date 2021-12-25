declare module 'react-native-dotenv' {
  export const API_BASE_URL: string;
  export const AUTHOR_NAME: string;
  export const AVATAR_PROFILE_URL: string;
  export const GITHUB_PROFILE_URL: string;
  export const CHART_BASE_URL: string;
}

declare module '@rainbow-me/animated-charts' {
  import { TextInputProps } from 'react-native';
  import { SvgProps, LineProps } from 'react-native-svg';
  export type Point = { x: number; y: number };
  export type ChartLabelProps = TextInputProps & {
    /**  
    @description reanimated worklet
    **/
    format: (value: unknown) => string;
  };
  export type ChartData = {
    points: Array<Point>;
    nativePoints?: Array<Point>;
    smoothingStrategy?: 'bezier' | 'simple' | 'complex';
    smoothingFactor?: number;
    yRange?: [number, number];
  };

  export type InterpolatorFunction = (params: {
    data: Point[];
    range?: number;
    includeExtremes?: boolean;
    removePointsSurroundingExtremes?: boolean;
    degree?: number;
    pickRange?: number;
  }) => Point[];

  export type ChartLineProps = LineProps & {
    color?: string;
    thickness?: number;
    length?: number;
  };
  export const ChartPathProvider: React.FC<{
    data: ChartData;
  }>;
  export const ChartDot: React.FC<SvgProps & { size?: number }>;
  export const ChartPath: React.FC<
    SvgProps & {
      height: number;
      width: number;
      smoothingWhileTransitioningEnabled?: number;
      strokeWidth?: number;
      selectedStrokeWidth?: number;
      gestureEnabled?: boolean;
      longPressGestureHandlerProps?: {
        maxDist?: number;
        minDurationMs?: number;
        shouldCancelWhenOutside?: boolean;
      };
      selectedOpacity?: number;
      hitSlop?: number;
      hapticsEnabled?: boolean;
      springConfig?: { damping?: number; mass?: number; stiffness?: number };
      timingFeedbackConfig?: { duration?: number };
      timingAnimationConfig?: { duration?: number };
    }
  >;
  export const ChartYLabel: React.FC<ChartLabelProps>;
  export const ChartXLabel: React.FC<ChartLabelProps>;
  export const CurrentPositionVerticalLine: React.FC<ChartLineProps>;
  export const OpeningPositionHorizontalLine: React.FC<ChartLineProps>;

  export const monotoneCubicInterpolation: InterpolatorFunction;
  export const bSplineInterpolation: InterpolatorFunction;
  export const simplifyData: InterpolatorFunction;
  export const useChartData: Function;
}
