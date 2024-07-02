import positionResources from './API_GET_PositionResources.json';

export const getPositionResources = () => {
  return positionResources.Response.data;
};

export const createEmployee = (employee: unknown) => {
  const employees = localStorage.getItem('employees') || '';
  const employeesParse = JSON.parse(employees);
  if (!Array.isArray(employeesParse)) {
    localStorage.setItem('employees', JSON.stringify([employee]));
  } else {
    employeesParse.push(employee);
    localStorage.setItem('employees', JSON.stringify(employeesParse));
  }
};

export const editEmployee = (id: number, employee: unknown) => {
  const employees = localStorage.getItem('employees') || '';
  const employeesParse = JSON.parse(employees);
  if (Array.isArray(employeesParse)) {
    employeesParse[id] = employee;

    localStorage.setItem('employees', JSON.stringify(employeesParse));
  }
};

export const removeEmployee = (id: number) => {
  const employees = localStorage.getItem('employees') || '';
  const employeesParse = JSON.parse(employees);
  if (Array.isArray(employeesParse)) {
    employeesParse.splice(id, 1);

    localStorage.setItem('employees', JSON.stringify(employeesParse));
  }
};

export const getEmployee = (id: number) => {
  const employees = localStorage.getItem('employees') || '';

  const employeesParse = JSON.parse(employees);
  if (Array.isArray(employeesParse)) {
    return employeesParse.find((_, index) => id === index);
  }
};

export const getEmployees = () => {
  const employees = localStorage.getItem('employees') || '';

  const employeesParse = JSON.parse(employees);
  if (!Array.isArray(employeesParse)) {
    return [];
  } else {
    return employeesParse.map((item, index) => {
      return {
        id: index,
        name: item.name,
        position: findNamePosition(item?.positions[0]?.positionResourceId),
        images: extractImages(item.positions),
      };
    });
  }
};

const findNamePosition = (id: number) => {
  const findPosition = getPositionResources()?.find(
    (item) => (item.positionResourceId = id)
  );

  return findPosition?.name;
};

const extractImages = (positions: { toolLanguages: any[] }[]) => {
  let imagesArray: any[] = [];

  positions?.forEach((position: { toolLanguages: any[] }) => {
    position.toolLanguages.forEach((toolLanguage) => {
      imagesArray = imagesArray.concat(toolLanguage.images);
    });
  });
  return imagesArray;
};
