import { Box, Typography } from '@mui/material';

export default async function() {
  // const map = new Map([ ['name', 'Buxan'], ['city', 'Moscow'] ])
  // const template = `Привет, меня зовут {name}, я из {city}`;

  const text = formatStr(
    `Привет, меня зовут {name}, я из {city}. Меня назвали {name} когда мне было {age}`,
    { name: 'ColoBrod', city: 'Moscow', age: 30 }, 
  );
  
  return (
    <Box p={2}>
      <Typography>
        {text}
      </Typography>
    </Box>
  );
}


function formatStr(template: string, map: Object) {
  /* [...Object.entries()].forEach() */
  const text = template.replace(/{(.*?)}/g, (_, key) => map[key] ?? "[Error]");
  return text;
}
