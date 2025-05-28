import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Group,
  Paper,
  ScrollArea,
  Table,
  useMantineTheme,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import noOutputs from "../assets/no-data.avif";
import { useStore } from "../hooks/use-store";
import { exportToExcel } from "../utils/excel-export";

export const OutputGrid = observer(() => {
  const { appStore } = useStore();
  const theme = useMantineTheme();
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableWrapperRef.current) {
      tableWrapperRef.current.style.height = "100%";
    }
  }, []);

  const handleExport = () => {
    const data = appStore.outputs.map(({ params, output }, index) => ({
      "#": index + 1,
      Temperature: params.temperature,
      "Max Tokens": params.max_tokens,
      "Presence Penalty": params.presence_penalty,
      "Frequency Penalty": params.frequency_penalty,
      "Stop Sequences": params.stop?.join(", ") || "-",
      Output: output,
    }));
    exportToExcel(data);
  };

  if (appStore.outputs.length === 0) {
    return (
      <Paper
        p="md"
        w="100%"
        h="100%"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={noOutputs}
          alt="No outputs"
          style={{ objectFit: "contain" }}
        />
      </Paper>
    );
  }

  return (
    <Paper
      p="md"
      w="100%"
      h="100%"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Group mb="md" style={{ justifyContent: "flex-end" }}>
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={appStore.outputs.length === 0}
          rightIcon={<FontAwesomeIcon icon={faFileExcel} />}
        >
          Download Excel
        </Button>
      </Group>
      <ScrollArea
        style={{ flex: 1, overflow: "auto" }}
        viewportRef={tableWrapperRef}
      >
        <Table striped withBorder>
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 10,
            }}
          >
            <tr>
              <th>#</th>
              <th>Temperature</th>
              <th>Max Tokens</th>
              <th>Presence Penalty</th>
              <th>Frequency Penalty</th>
              <th>Stop Sequences</th>
              <th>Output</th>
            </tr>
          </thead>
          {
            <tbody>
              {appStore.outputs.map(({ params, output }, i) => (
                <tr
                  key={i}
                  style={{
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      theme.colors.indigo[0])
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  <td>{i + 1}</td>
                  <td>{params.temperature}</td>
                  <td>{params.max_tokens}</td>
                  <td>{params.presence_penalty}</td>
                  <td>{params.frequency_penalty}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {params.stop?.join(", ") || "-"}
                  </td>
                  <td
                    style={{
                      whiteSpace: "pre-wrap",
                      minWidth: "300px",
                    }}
                  >
                    {output}
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </Table>
      </ScrollArea>
    </Paper>
  );
});
