export type RootStackParamList = {
  Home: undefined;
  CoinDetails: { coinId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
