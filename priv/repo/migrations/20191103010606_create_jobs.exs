defmodule Time2.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :job_code, :string, null: false
      add :budget, :integer, null: false
      add :name, :string, null: false
      add :desc, :text, null: false

      timestamps()
    end

  end
end
