import renderer from "react-test-renderer";
import { CoinList } from "./CoinList";
import { COIN_DATA } from "../constants";

it("<CoinList /> renders correctly", () => {
  const tree = renderer
    .create(<CoinList coins={COIN_DATA}></CoinList>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
