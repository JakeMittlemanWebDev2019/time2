# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :time2,
  ecto_repos: [Time2.Repo]

# Configures the endpoint
config :time2, Time2Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "wUQEuUPBl4e4MM9u0Fn/B7WGhHcbGsuCLNcTV9EdNQQ+5E7Sjyg1lOr0KMN00QFa",
  render_errors: [view: Time2Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Time2.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
