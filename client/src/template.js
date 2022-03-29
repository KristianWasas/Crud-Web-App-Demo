export const schema = `{
    "type": "object",
    "tablename": "Employees",

    "properties": {

      "Name": {
        "type": "string"
      },

      "Birthdate": {
        "type": "string",
        "format": "date"
      },

      "Company_ID": {
        "type": "integer",
        "minimum": 100000,
        "maximum": 999999
      },

      "Department": {
        "type": "string",
        "enum": ["R&D", "Sales", "Marketing", "Management"]
      },

      "Uses_company_car": {
        "type": "boolean"
      }

    },

    "required": [
      "Name",
      "Birthdate",
      "Company_ID",
      "Department",
      "Uses_company_car"
    ]
  }`;

export default schema