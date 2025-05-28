import { Flex, Stack } from "@mantine/core";
import { Navbar } from "./components/navbar";
import { OutputGrid } from "./components/output-grid";
import { PromptForm } from "./components/prompt-form-component";

function App() {
  return (
    <Stack w={"100%"} h="100%">
      <Navbar />
      <Flex w={"100%"} h={"100%"} gap={8} p={8} style={{ overflow: "hidden" }}>
        <Flex style={{ flex: 0.3 }}>
          <PromptForm />
        </Flex>
        <Flex style={{ flex: 1 }}>
          <OutputGrid />
        </Flex>
      </Flex>
    </Stack>
  );
}

export default App;
