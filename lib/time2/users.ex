defmodule Time2.Users do

  alias Time2.Repo
  alias Time2.Workers.Worker

  def authenticate_user(email, password) do

    if (Time2.Workers.get_worker_by_email(email) == nil) do
      user = Repo.get_by(Worker, email: email)
      case Argon2.check_pass(user, password) do
        {:ok, user} -> user
        _else       -> nil
      end
    else
      user = Repo.get_by(Manager, email: email)
      case Argon2.check_pass(user, password) do
        {:ok, user} -> user
        _else       -> nil
      end
    end
  end
end