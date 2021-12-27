// set all screens of navigator
export type RootStackParamList = {
  Home: undefined;
  CoinDetails: { coinId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
