defmodule TasktrackaspaWeb.PageController do
  use TasktrackaspaWeb, :controller

  import PhoenixGon.Controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
