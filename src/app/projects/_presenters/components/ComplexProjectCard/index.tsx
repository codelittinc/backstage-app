import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import routes from "@/routes";

interface Props {
  [key: string]: any;
  color?: string;
  dateTime?: string;
  description: ReactNode;
  dropdown?: {
    action?: (...arg: any) => void;
    menu?: ReactNode;
  };
  hasUsersPermission?: boolean;
  image: string;
  members?: string[];
  title: string;
}

function ComplexProjectCard({
  color = "light",
  image,
  title,
  dateTime,
  description,
  members = [],
  dropdown,
  onClickTitle,
  hasUsersPermission,
}: Props): JSX.Element {
  const router = useRouter();
  const membersToRender = members;
  const renderMembers = membersToRender.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <Avatar
        key={memberKey}
        src={member.src || `https://robohash.org/${member.id}`}
        alt="member profile"
        onClick={() => {
          if (hasUsersPermission) {
            router.push(routes.userPath(member.id!));
          }
        }}
        bgColor="light"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: hasUsersPermission ? "pointer" : "",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card>
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: onClickTitle ? "pointer" : "" }}
        >
          <Avatar
            shadow="lg"
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{
              p: 1,
              mt: -6,
              borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            }}
          />
          <Box ml={2} mt={-2} lineHeight={0} sx={{ overflow: "hidden" }}>
            <Typography
              variant="h6"
              textTransform="capitalize"
              fontWeight="medium"
              onClick={onClickTitle}
              sx={{
                textWrap: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
            {members.length > -1 ? (
              <Box display="flex">{renderMembers}</Box>
            ) : null}
          </Box>
          {dropdown && (
            <Typography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                mt: -1,
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }}>
                more_vert
              </Icon>
            </Typography>
          )}
          {dropdown?.menu}
        </Box>
        <Box my={2} lineHeight={1}>
          <Typography variant="button" fontWeight="light" color="text">
            {description}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {members.length > -1 ? (
            <Box display="flex" flexDirection="column" lineHeight={0}>
              <Typography variant="button" fontWeight="medium">
                {members.length}
              </Typography>
              <Typography
                variant="button"
                fontWeight="regular"
                color="secondary"
              >
                Participants
              </Typography>
            </Box>
          ) : null}
          {dateTime ? (
            <Box display="flex" flexDirection="column" lineHeight={0}>
              <Typography variant="button" fontWeight="medium">
                {dateTime}
              </Typography>
              <Typography
                variant="button"
                fontWeight="regular"
                color="secondary"
              >
                Due date
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
}

export default ComplexProjectCard;
