import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { boardSetPage, boardBrowseAction } from "@Store/modules/Board/actions";
import { RootStateType } from "@Store/modules";
import BoardPresenter from "./BoardPresenter";

export interface IProps extends RouteComponentProps<{ boardName: string }> {
  main: RootStateType["main"];
  board: RootStateType["board"];
  boardBrowseAction: typeof boardBrowseAction;
  boardSetPage: typeof boardSetPage;
}

const BoardContainer = withRouter((props: IProps) => {
  const POST_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    props.boardBrowseAction(
      parseInt(props.match.params.boardName),
      props.board.page
    );
  }, [props.match.params.boardName, props.board.page]);
  const handlePage = (e: any) => {
    e.persist();
    props.boardSetPage(parseInt(e.currentTarget.dataset.page));
  };
  return (
    <BoardPresenter
      title={"title"}
      handlePage={handlePage}
      totalCount={props.board.count}
      currentPage={props.board.page}
      postlist={props.board.rows}
      postPerPage={POST_PER_PAGE}
    />
  );
});

export default connect(
  ({ main, board, loading }: RootStateType) => ({ main, board }),
  { boardSetPage, boardBrowseAction }
)(BoardContainer);