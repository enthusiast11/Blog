import  React, {FC} from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import { OutlinedInput, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export  interface ChipData {
  key: number;
  label: string;
}
interface IfuncData {
  onHashteg:(hash: ChipData[]) => void
}

 const Hashteg: FC<IfuncData>= ({onHashteg }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState("");
  const [selectedhashteg, setselectedHashteg] = React.useState<ChipData[]>([]);
  const [hashteg, setHashteg] = React.useState("");
  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" }
  ]);

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5)
  }));
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  }));
  function addHashteg(
    arrValue: ChipData[],
    func: (hash: ChipData[]) => void,
    value: string,
    setValue?: (hash: string) => void,
  ) {
    let copy = Object.assign([], arrValue);
    copy.push({ key: arrValue.length + 1, label: value });
    if(setValue) {
      setValue("");
    }
    func(copy);
    if(arrValue==selectedhashteg) {
      onHashteg(copy)
      console.log(copy);
      
    }
    setExpanded(false);
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = (chipToDelete: ChipData) => () => {
    setselectedHashteg((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleChange = (event: SelectChangeEvent) => {
    setHashteg(event.target.value as string);
  };


  return (
    <div>
      <div style={{ display: "flex", listStyle: "none" }}>
        {selectedhashteg.map((data) => {
          let icon;

          if (data.label === "React") {
            icon = <TagFacesIcon />;
          }

          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={
                  data.label === "React" ? undefined : handleDelete(data)
                }
              />
            </ListItem>
          );
        })}
      </div>
      <FormControl sx={{width:'100%', mb: 4 }}>
        <InputLabel id="demo-simple-select-label" ></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          onChange={handleChange}
        >
          {chipData.map((item) => {
            return (
              <MenuItem
                onClick={() =>
                  addHashteg(selectedhashteg, setselectedHashteg, item.label)
                }
                value={item.label}
              >
                {item.label}
              </MenuItem>
            );
          })}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MenuItem>
              <ControlPointIcon />
            </MenuItem>
          </ExpandMore>
        </Select>
      </FormControl>
      <Collapse in={expanded} timeout="auto"  sx={{mb:2}}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <OutlinedInput onChange={(e) => setData(e.target.value)} />
          <Button
            onClick={() => addHashteg(chipData, setChipData, data, setData)}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
      </Collapse>
    </div>
  );
}
export default Hashteg