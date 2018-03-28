# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tasktrackaspa,
  ecto_repos: [Tasktrackaspa.Repo]

# Configures the endpoint
config :tasktrackaspa, TasktrackaspaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "t9GTcC9yH+ybYy+FqFRUrBQwzcjMSsVx0Or5hmOn6nF9sDF2AUb3A/zUhCoXWpRi",
  render_errors: [view: TasktrackaspaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Tasktrackaspa.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
