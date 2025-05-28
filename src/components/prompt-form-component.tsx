import { observer } from "mobx-react-lite";
import {
  Textarea,
  Button,
  Select,
  MultiSelect,
  Paper,
  TextInput,
  Slider,
  Stack,
  Box,
  Group,
  Text,
  Flex,
} from "@mantine/core";
import { useStore } from "../hooks/use-store";
import { ModelType } from "../types/OpenAi";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PromptForm = observer(() => {
  const { appStore } = useStore();
  return (
    <Paper p="md" shadow="sm" w={"100%"}>
      <Stack
        spacing={"lg"}
        style={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          padding: 10,
        }}
      >
        <TextInput
          size={"xs"}
          label="Product"
          value={appStore.product}
          onChange={(e) => appStore.setProduct(e.currentTarget.value)}
        />
        <Textarea
          size={"xs"}
          label="System Prompt"
          value={appStore.systemPrompt}
          onChange={(e) => appStore.setSystemPrompt(e.currentTarget.value)}
          autosize
        />
        <Textarea
          size={"xs"}
          label="User Prompt"
          value={appStore.userPrompt}
          onChange={(e) => appStore.setUserPrompt(e.currentTarget.value)}
          autosize
        />
        <Select
          size={"xs"}
          label="Model"
          data={["gpt-3.5-turbo", "gpt-4"]}
          value={appStore.model}
          onChange={(val) => val && appStore.setModel(val as ModelType)}
        />
        <Box mb={10}>
          <Text size="xs" fw={500} mb={4}>
            Temperature
          </Text>
          <Slider
            size={"xs"}
            min={0}
            defaultValue={0.7}
            max={1.2}
            step={0.1}
            value={appStore.temperature[0]}
            onChange={(value) => appStore.setTemperature(value)}
            marks={[]}
          />
          <Group style={{ justifyContent: "space-between" }} mt={2}>
            <Text size="xs">Precise</Text>
            <Text size="xs">Balanced</Text>
            <Text size="xs">Creative</Text>
          </Group>
        </Box>
        <Box mb={10}>
          <Text size="xs" fw={500} mb={4}>
            Max Tokens
          </Text>
          <Slider
            min={50}
            max={300}
            size={"xs"}
            defaultValue={50}
            step={50}
            value={appStore.maxTokens[0]}
            onChange={(value) => appStore.setMaxTokens(value)}
            marks={[]}
          />
          <Group style={{ justifyContent: "space-between" }} mt={2}>
            <Text size="xs">Short</Text>
            <Text size="xs">Medium</Text>
            <Text size="xs">Long</Text>
          </Group>
        </Box>
        <Box mb={10}>
          <Text size="xs" fw={500} mb={4}>
            Presence Penalty
          </Text>
          <Slider
            min={0}
            size={"xs"}
            max={1.5}
            defaultValue={0}
            step={0.1}
            value={appStore.presencePenalty[0]}
            onChange={(value) => appStore.setPresencePenalty(value)}
            marks={[]}
          />
          <Group style={{ justifyContent: "space-between" }} mt={2}>
            <Text size="xs">None</Text>
            <Text size="xs">Moderate</Text>
            <Text size="xs">High</Text>
          </Group>
        </Box>
        <Box mb={10}>
          <Text size="xs" fw={500} mb={4}>
            Frequency Penalty
          </Text>
          <Slider
            min={0}
            size={"xs"}
            max={1.5}
            defaultValue={0}
            step={0.1}
            value={appStore.frequencyPenalty[0]}
            onChange={(value) => appStore.setFrequencyPenalty(value)}
            marks={[]}
          />
          <Group style={{ justifyContent: "space-between" }} mt={2}>
            <Text size="xs">None</Text>
            <Text size="xs">Moderate</Text>
            <Text size="xs">High</Text>
          </Group>
        </Box>
        <MultiSelect
          label="Stop Sequences"
          data={appStore.stopSequences}
          size={"xs"}
          placeholder="Enter custom stop sequences"
          searchable
          creatable
          getCreateLabel={(q) => `+ Add "${q}"`}
          onCreate={(query) => {
            appStore.setStopSequences([...appStore.stopSequences, query]);
            return query;
          }}
          value={appStore.stopSequences}
          onChange={(v) => appStore.setStopSequences(v)}
        />
        <Flex mt="md" gap="md">
          <Button
            loading={appStore.loading}
            onClick={() => appStore.runAll()}
            rightIcon={<FontAwesomeIcon icon={faMicrochip} />}
            w={180}
          >
            Generate all
          </Button>
          <Button
            loading={appStore.currentLoading}
            onClick={() => appStore.runCurrent()}
            rightIcon={<FontAwesomeIcon icon={faMicrochip} />}
            w={180}
          >
            Generate current
          </Button>
        </Flex>
      </Stack>
    </Paper>
  );
});
