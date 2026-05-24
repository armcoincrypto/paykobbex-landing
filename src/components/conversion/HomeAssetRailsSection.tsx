import { SUPPORTED_ASSETS } from "@/lib/supported-assets";

const assetAccent: Record<string, string> = {
  USDT: "home-asset-rails__mark--usdt",
  BTC: "home-asset-rails__mark--btc",
  ETH: "home-asset-rails__mark--eth",
  TRX: "home-asset-rails__mark--trx",
  BNB: "home-asset-rails__mark--bnb",
  LTC: "home-asset-rails__mark--ltc",
  DASH: "home-asset-rails__mark--dash",
};

export function HomeAssetRailsSection() {
  return (
    <section
      className="home-asset-rails home-tier-annotation"
      aria-labelledby="home-asset-rails-heading"
    >
      <header className="home-asset-rails__header">
        <p className="home-asset-rails__eyebrow type-eyebrow type-eyebrow--soft">
          Supported assets
        </p>
        <h2 id="home-asset-rails-heading" className="home-asset-rails__title">
          Stablecoin rails businesses already understand
        </h2>
        <p className="home-asset-rails__lead">
          Selected crypto payment rails — scoped per merchant environment after approval, not a
          universal public inventory.
        </p>
      </header>

      <div className="home-asset-rails__shell">
        <div className="home-asset-rails__strip" role="list" aria-label="Supported asset rails">
          {SUPPORTED_ASSETS.map((asset) => (
            <article
              key={asset.symbol}
              className="home-asset-rails__card"
              role="listitem"
            >
              <div className="home-asset-rails__card-head">
                <span
                  className={`home-asset-rails__mark ${assetAccent[asset.symbol] ?? ""}`}
                  aria-hidden="true"
                >
                  {asset.symbol.slice(0, 1)}
                </span>
                <div className="home-asset-rails__identity">
                  <span className="home-asset-rails__symbol">{asset.symbol}</span>
                  <span className="home-asset-rails__name">{asset.name}</span>
                </div>
              </div>
              <div className="home-asset-rails__rails" aria-label={`${asset.symbol} networks`}>
                {asset.rails.map((rail) => (
                  <span key={rail} className="home-asset-rails__rail">
                    {rail}
                  </span>
                ))}
              </div>
              <span className="home-asset-rails__status">Environment-scoped</span>
            </article>
          ))}
        </div>

        <footer className="home-asset-rails__footer">
          <p className="home-asset-rails__note">
            Asset-only reference — no live market data on this marketing site. Enabled combinations
            are agreed during merchant onboarding.
          </p>
        </footer>
      </div>
    </section>
  );
}
