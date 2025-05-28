import { observer } from "mobx-react-lite";
import { Table, Paper, ScrollArea, useMantineTheme } from "@mantine/core";
import { useStore } from "../hooks/use-store";
import { useEffect, useRef } from "react";

export const OutputGrid = observer(() => {
  const { appStore } = useStore();
  const theme = useMantineTheme();
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableWrapperRef.current) {
      tableWrapperRef.current.style.height = "100%";
    }
  }, []);

  return (
    <Paper
      p="md"
      w="100%"
      h="100%"
      style={{ display: "flex", flexDirection: "column" }}
    >
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
        </Table>
      </ScrollArea>
    </Paper>
  );
});
