export abstract class BibliotecaConstant {
  // OPERACIÓN A REALIZAR
  static readonly ACTION_ADD: string = 'add';
  static readonly ACTION_UPDATE: string = 'update';

  //TITULOS DE LAS PAGINAS
  static readonly TITLE_PAGE_CURSOS: string = 'Cursos';
  static readonly TITLE_PAGE_DEPARTAMENTOS: string = 'Departamentos';
  static readonly TITLE_PAGE_HORARIOS: string = 'Horarios';
  static readonly TITLE_PAGE_MATERIAS: string = 'Materias';
  static readonly TITLE_PAGE_PERSONAL: string = 'Personal';
  static readonly TITLE_PAGE_PLANILLA_HORARIA: string = 'Planilla Horaria';
  static readonly TITLE_PAGE_REGISTROS: string = 'Registros';
  
  static readonly TITLE_PAGE_AUTHOR: string = 'Autor';
  static readonly TITLE_PAGE_BOOK_CATALOG: string = 'Laboratorio';
  static readonly TITLE_MODULE_SECURITY: string = 'Seguridad';
  static readonly TITLE_PAGE_DASHBOARD: string = 'Dashboard';
  static readonly TITLE_PAGE_CHANGE_PASSWORD: string = 'Cambiar Contraseña';
  static readonly TITLE_PAGE_USER: string = 'Usuario';
  static readonly TITLE_PAGE_AUTHORITY: string = 'Rol';

  //TITULOS PARA LOS MODALES
  static readonly TITLE_MODAL_QUESTION_SAVE: string =
    '¿Está seguro de crear un nuevo registro?';
  static readonly TITLE_MODAL_QUESTION_UPDATE: string =
    '¿Está seguro de actualizar el registro?';
  static readonly TITLE_MODAL_QUESTION_DELETE: string =
    '¿Está seguro de eliminar el registro?';
  static readonly TITLE_MODAL_LOADING: string = 'Cargando...';
  static readonly TITLE_MODAL_SAVE: string = 'El Registro Se Guardó Correctamente';
  static readonly TITLE_MODAL_UPDATE: string = 'El Registro Se Actualizó Correctamente';
  static readonly TITLE_MODAL_DELETE: string = 'El Registro Se Eliminó Correctamente';
  static readonly TITLE_MODAL_ERROR_AREA: string = 'Seleccione una Area';
  static readonly TITLE_REQUEST_HTTP_SERVER_ERROR: string =
    'Error interno del servidor';
  static readonly TITLE_REQUEST_HTTP_CLIENT_ERROR_NOT_FOUND: string =
    'Registro no encontrado';

  // VALORES VACIOS
  static readonly VC_EMTY: string = '';
  static readonly VC_SEARCH: string = 'Buscar';
  static readonly VC_ADMIN: string = 'Administrar';

  static readonly VC_SUCCESS: string = 'success';
  static readonly VC_WARN: string = 'warning';
  static readonly VC_INFO: string = 'info';
  static readonly VC_ERROR: string = 'error';
  static readonly VC_QUESTION: string = 'question';

  // NRO DE PAGINAS
  static readonly PAGE_NRO_INITIAL: number = 0;
  static readonly PAGE_SIZE_INITIAL: number = 10;
  static readonly LABEL_ITEMS_POR_PAGINA: string = "Filas por Página";
  static readonly LABEL_FIRST_PAGE: string = "Primera Página";
  static readonly LABEL_LAST_PAGE: string = "Última Página";
  static readonly LABEL_NEXT_PAGE: string = "Siguiente";
  static readonly LABEL_PREVIOUS_PAGE: string = "Anterior";

  // VALORES NO PERMITIDOS
  static readonly NOT_ALLOWED_VALUES: any = /[!@#$%^&*(),.?":{}|<>]/;
}
