defmodule Time2.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :is_manager, :boolean, default: false, null: false

      timestamps()
    end

  end
end
