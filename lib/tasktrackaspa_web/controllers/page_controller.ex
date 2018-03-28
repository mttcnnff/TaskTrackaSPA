defmodule TasktrackaspaWeb.PageController do
  use TasktrackaspaWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
