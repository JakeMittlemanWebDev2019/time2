defmodule Time2.Repo.Migrations.CreateTimesheets do
  use Ecto.Migration

  def change do
    create table(:timesheets) do
      add :date, :date
      add :approved, :boolean, default: false, null: false
      add :worker, references(:workers, on_delete: :nothing)

      timestamps()
    end

    create index(:timesheets, [:worker])
  end
end
