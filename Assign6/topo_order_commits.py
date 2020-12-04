# Keep the function signature,
# but replace its body with your implementation.
#
# Note that this is the driver function.
# Please write a well-structured implemention by creating other functions outside of this one,
# each of which has a designated purpose.
#
# As a good programming practice,
# please do not use any script-level variables that are modifiable.
# This is because those variables live on forever once the script is imported,
# and the changes to them will persist across different invocations of the imported functions.
import os
import sys
import zlib

def topo_order_commits():
    # setup by performing some function calls
    branch_commits = get_local_gitBranches()
    commitsToChildren = dict()
    commitsToParents = dict()
    root_commits = build_commit_relations(commitsToChildren, commitsToParents)
   
    topological_order = build_topological_relations()
    if len(topological_order) == 0:
        return

    # print out commit hashes in topo order 
    output_line = topological_order[0]
    for branch in branch_commits:
        if topological_order[0] == branch_commits[branch]:
            output_line += " " + branch
    print (output_line)

    i = 1
    while (i < len(topological_order)):
        output_line = ""
        current_commit = topological_order[i]
        prev_commit_parents = commitsToParents[topological_order[i-1]]
        
        # if current commit is not a parent of the previous commit
        # print out previous commit's parents in the next line
        # followed by an empty line
        # and then the children of the current commit
        if current_commit not in prev_commit_parents:
            for index in range(len(prev_commit_parents)):
                if index != len(prev_commit_parents) - 1:
                    output_line += prev_commit_parents[index] + " "
                else:
                    output_line += prev_commit_parents[index]
            print (output_line + "=")
            print ()

            output_line = "="
            for index in range(len(commitsToChildren[current_commit])):
                if index != len(commitsToChildren[current_commit]) - 1:
                    output_line += commitsToChildren[current_commit][index] + " "
                else:
                    output_line += commitsToChildren[current_commit][index]
            print (output_line)
        
        output_line = current_commit
        # if commiit is a branch, print out the branch name along commit hash
        for branch in branch_commits:
            if topological_order[i] == branch_commits[branch]:
                output_line += " " + branch
        print (output_line)
        i += 1


# determine the path of the top level git dir
def find_topLevel_git():
    #assigns the current working directory to path
    path = os.getcwd() 
    while True: 
        # search for .git in our current path
        if (os.path.isdir(path + '/.git')):
       	    return os.path.join (path, '.git') # return path + /.git
    
        # if dir in path equals parent dir (aka root) 
        # break out of loop
        if (os.path.dirname(path) == path):
            break;
    
        # assigns path to parent dir of path
        path = os.path.dirname(path)

    # .git directory not found
    sys.exit("Not inside a Git repository")

# determine the name of all branches within a git repo
def get_local_gitBranches ():
    #we will search for local branches inside .../.git/refs/heads
    branchDir = os.path.join (find_topLevel_git(), 'refs', 'heads')
    branch_names = []
    for root, dirs, files in os.walk(branchDir):
        for file in files: 
            branch_fullPath = os.path.join(root, file)
            branch = branch_fullPath[len(branchDir)+1:]
            branch_names.append(branch)  

    branchToCommitID = dict()
    #read hashes stored inside each branch file
    for branch in branch_names:
        branch_fullPath = os.path.join (branchDir, branch)
        commitID = open(branch_fullPath, 'r').read().replace('\n', '')
        branchToCommitID[branch] = commitID

    return branchToCommitID

# determine the child and parent commits of each commit 
# and return a list of commits with no parents
def build_commit_relations (commitsToChildren = dict(), commitsToParents = dict()):
    # we will build a commit graph using the contents inside .../.git/objects
    # we will start our relation with our branches
    commitsDir = os.path.join (find_topLevel_git(), 'objects')
    branch_contents = get_local_gitBranches()
    root_commits = []
    stack = [] # for DFS
    for b in branch_contents:
        stack.append(branch_contents[b])
    
    while (len (stack) != 0):
        current_commit = stack.pop()
        current_commit_path = os.path.join (commitsDir, current_commit[:2], current_commit[2:])
        compressed_contents = open(current_commit_path, 'rb').read()
        decompressed_contents = zlib.decompress(compressed_contents).decode()

        if current_commit not in commitsToChildren:
            commitsToChildren[current_commit] = []
        if current_commit not in commitsToParents:
            commitsToParents[current_commit] = []

        while (decompressed_contents.find('\nparent') > -1):
            index = decompressed_contents.find('\nparent')
            parent_commit = decompressed_contents[index + 8: index + 48]
            commitsToParents[current_commit].append (parent_commit)
            if parent_commit not in stack and parent_commit not in commitsToParents:
                stack.append(parent_commit)
            
            if parent_commit not in commitsToChildren:
                commitsToChildren[parent_commit] = []
            commitsToChildren[parent_commit].append (current_commit)
        
            decompressed_contents = decompressed_contents[index + 48:]                                                   

    #find root_nodes (commits with no parents)
    for commit in commitsToParents:
        if (len(commitsToParents[commit]) == 0):
            root_commits.append (commit)
            
    return root_commits

def build_topological_relations ():
    # get parent and chilren relation by calling build_commit_relations
    commitsToChildren = dict()
    commitsToParents = dict()
    root_commits = build_commit_relations(commitsToChildren, commitsToParents)

    # buld tological ordering relation using DFS
    topological_order = []
    queue = []

    # first add all commits with no parents into queue
    for root in root_commits:
        queue.append (root)


    while (len(queue) != 0):
        current_commit = queue.pop(0)
        topological_order.append(current_commit)

        for child_commit in commitsToChildren[current_commit]:
            commitsToParents[child_commit].remove(current_commit)
            

            if (len(commitsToParents[child_commit]) == 0):
                queue.append(child_commit)


    if (len(commitsToParents) > len(topological_order)):
        sys.exit("ERROR")

    topological_order.reverse()
    return topological_order


if __name__ == '__main__':
     topo_order_commits()
