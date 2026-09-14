import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/angular-table';
import { Player, PlayerTable } from '../../../../shared/models/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'players-table',
  standalone: true,
  imports: [FlexRenderDirective],
  templateUrl: './players-table.html',
  styleUrl: './players-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersTable {

  readonly router = inject(Router);

  readonly players = input.required<Player[]>();

  readonly dataPlayers = computed<PlayerTable[]>(() => {
    return this.players().map((player: any) => {
      const rawDoc = player.identityDocument?.docNumber;
      const docNumber: number[] =
        rawDoc !== undefined && rawDoc !== null && rawDoc !== '' ? [Number(rawDoc)] : [];
      const categories: string[] = Array.isArray(player.playerTennisCategories)
        ? player.playerTennisCategories
            .map((item: any) => item.tennisCategory?.categoryName)
            .filter(Boolean)
        : [];
      const clubName: string[] = Array.isArray(player.playerClubs)
        ? player.playerClubs.map((item: any) => item.club?.clubName).filter(Boolean)
        : [];

      return {
        profileKey: player.profileKey,
        firstName: player.firstName,
        secondName: player.secondName,
        firstLastname: player.firstLastname,
        secondLastname: player.secondLastname,
        sex: player.sex,
        docNumber,
        categories,
        clubName,
      };
    });
  });

  readonly sorting = signal<SortingState>([]);
  readonly globalFilter = signal<string>('');
  readonly pagination = signal({
    pageIndex: 0,
    pageSize: 7,
  });

  readonly columns: ColumnDef<PlayerTable>[] = [
    {
      accessorKey: 'firstName',
      header: 'Nombre',
      cell: (info) => {
        const row = info.row.original;
        return `${row.firstName} ${row.secondName || ''} ${row.firstLastname} ${row.secondLastname || ''}`.trim();
      },
    },
    {
      accessorKey: 'docNumber',
      header: 'Cédula',
      cell: (info) => {
        const row = info.row.original;
        return row.docNumber && row.docNumber.length > 0 ? row.docNumber[0] : 'N/A';
      },
    },
    {
      accessorKey: 'categories',
      header: 'Categorías',
      cell: (info) => {
        const row = info.row.original;
        return row.categories && row.categories.length > 0 ? row.categories.join(', ') : 'N/A';
      },
    },
    {
      accessorKey: 'clubName',
      header: 'Club',
      cell: (info) => {
        const row = info.row.original;
        return row.clubName && row.clubName.length > 0 ? row.clubName.join(', ') : 'N/A';
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      enableSorting: false,
      cell: (info) => info.row.original.profileKey,
    },
  ];

  readonly table = createAngularTable(() => ({
    data: this.dataPlayers(),
    columns: this.columns,
    state: {
      sorting: this.sorting(),
      globalFilter: this.globalFilter(),
      pagination: this.pagination(),
    },
    onSortingChange: (updater) => {
      typeof updater === 'function' ? this.sorting.update(updater) : this.sorting.set(updater);
    },
    onGlobalFilterChange: (updater) => {
      typeof updater === 'function'
        ? this.globalFilter.update(updater)
        : this.globalFilter.set(updater);
    },
    onPaginationChange: (updater) => {
      typeof updater === 'function'
        ? this.pagination.update(updater)
        : this.pagination.set(updater);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  }));

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.table.setGlobalFilter(input.value);
  }

  sortIndicator(sortDirection: false | 'asc' | 'desc'): string | null {
    if (sortDirection === 'asc') return ' 🔼';
    if (sortDirection === 'desc') return ' 🔽';
    return null;
  }

  detailsPlayer(player: Player): void {
    this.router.navigate(['/backoffice/players', player.profileKey], {
      state: { player },
    });
  }
}
