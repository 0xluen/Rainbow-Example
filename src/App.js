import {
    getDefaultWallets,
    RainbowKitProvider,
    ConnectButton
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
    allChains,
    configureChains,
    createClient,
    WagmiConfig,
    useNetwork,
    useAccount
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const alchemy_key = ""

const { chains, provider } = configureChains(allChains, [
    alchemyProvider({ alchemyId: alchemy_key }),
    publicProvider()
]);

const { connectors } = getDefaultWallets({
    appName: "Showtime",
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
});
const Details = () => {
    const { activeChain } = useNetwork();
    const { data } = useAccount();
    console.log(data);

    return activeChain ? <>{activeChain.name}</> : <p>Not connected</p>;
};

function App() {
  return (
      <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
              <div className="App">
                  <ConnectButton />
                  <h1>Rainbow Example</h1>
                  <Details />
              </div>
          </RainbowKitProvider>
      </WagmiConfig>
  );
}

export default App;
