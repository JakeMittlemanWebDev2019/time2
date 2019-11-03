defmodule Time2.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :is_manager, :boolean, default: false
    field :name, :string
    field :password_hash, :string

    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :is_manager, :password])
    |> hash_password()
    |> validate_required([:name, :email, :is_manager, :password_hash])
  end

  def hash_password(changeset) do
    pw = get_change(changeset, :password)
    if pw do
      change(changeset, Argon2.add_hash(pw))
    else
      changeset
    end
  end
end
