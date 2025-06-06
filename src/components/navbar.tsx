import { observer } from "mobx-react-lite";
import { Group, Text, Button, Paper } from "@mantine/core";
import { useStore } from "../hooks/use-store";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Navbar = observer(() => {
  const { appStore } = useStore();

  return (
    <Paper
      p="md"
      shadow="sm"
      withBorder
      style={{ position: "sticky", top: 0, zIndex: 100 }}
    >
      <Group style={{ justifyContent: "space-between" }}>
        <Text size="xl" fw={700}>
          🧪 Interactive Prompt Playground
        </Text>
        <Button
          variant="filled"
          onClick={() => appStore.reset()}
          rightIcon={<FontAwesomeIcon icon={faRefresh} />}
        >
          Reset
        </Button>
      </Group>
    </Paper>
  );
});
