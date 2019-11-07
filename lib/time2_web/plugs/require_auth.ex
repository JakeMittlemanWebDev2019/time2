defmodule Time2Web.Plugs.RequireAuth do
  import Plug.Conn

  def init(args), do: args

  def call(conn, _args) do
    token = List.first(get_req_header(conn, "x-auth"))
    case Phoenix.Token.verify(Time2Web.Endpoint, "session", token, max_age: 86400) do
      {:ok, user_id} ->
        if (Time2.Workers.get_worker(user_id) == nil) do
          assign(conn, :current_user, Time2.Managers.get_manager!(user_id))
        else
          assign(conn, :current_user, Time2.Workers.get_worker!(user_id))
        end
      {:error, err} ->
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unprocessable_entity, Jason.encode!(%{"error" => err}))
        |> halt()
    end
  end
end